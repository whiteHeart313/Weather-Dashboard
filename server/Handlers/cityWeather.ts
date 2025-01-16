import { cityWeatherResponse, typeValidation, userRequestWeather, DailyForecast } from '../types';
import axios from 'axios';
import { RedisClientType } from 'redis';
import { getFromCache, redisClient, setInCache } from '../cache/cacheDataStore';
export const getCityCurrentWeather: typeValidation<
  userRequestWeather,
  cityWeatherResponse
> = async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send({ message: 'City name is required' });
    return;
  }

  const cachedData = await getFromCache(req.path, cityName);

  if (cachedData !== null) {
    console.log('here data is returned from the cache ');
    res.status(200).send(cachedData as cityWeatherResponse);
    return;
  }

  // call the API
  try {
    const apiKey = process.env.OPEN_WEATHER_KEY;
    const firstPartOfUrl = process.env.OPEN_WEATHER_API_LINK;
    const url = `${firstPartOfUrl}q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const weatherData: cityWeatherResponse = {
      cityName: response.data.name,
      currentTemprature: response.data.main.temp,
      weatherDescription: response.data.weather[0].description,
      humidityLevel: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };

    await setInCache(req.path, cityName, weatherData);

    res.status(200).send(weatherData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.data.cod) {
      res.status(error.response.data.cod).send({ message: error.response.data.message });
    } else res.status(500).send({ message: 'Something Went Wrong! ' });
  }
};

export const getCityForecastWeather: typeValidation<userRequestWeather, DailyForecast[]> = async (
  req,
  res
) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send({ message: 'City name is required' });
    return;
  }
  const cachedData = await getFromCache(req.path, cityName);

  if (cachedData !== null) {
    console.log('here data is returned from the cache ');
    res.status(200).send(cachedData as DailyForecast[]);
    return;
  }

  try {
    const apiKey = process.env.OPEN_WEATHER_KEY;
    const firstPartOfUrl = process.env.OPEN_WEATHER_FORCAST_LINK;
    const url = `${firstPartOfUrl}q=${cityName}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const forecastData = response.data.list;

    const dailyForecasts: {
      [date: string]: { temps: number[]; descriptions: string[] };
    } = {};

    forecastData.forEach((entry: any) => {
      const date = entry.dt_txt.split(' ')[0];
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = { temps: [], descriptions: [] };
      }
      dailyForecasts[date].temps.push(entry.main.temp);
      dailyForecasts[date].descriptions.push(entry.weather[0].description);
    });
    // the API return 4 weather descriptions for each day, we will use the first one
    const result: DailyForecast[] = Object.keys(dailyForecasts).map(date => {
      const temps = dailyForecasts[date].temps;
      const descriptions = dailyForecasts[date].descriptions;
      const averageTemperature = `${temps.reduce((a, b) => a + b, 0) / temps.length} °C`;
      const weatherDescription = descriptions[0];

      return {
        date,
        averageTemperature,
        weatherDescription,
      };
    });

    await setInCache(req.path, cityName, result);

    res.status(200).send(result);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.data.cod) {
      res.status(error.response.data.cod).send({ message: error.response.data.message });
    } else res.status(500).send({ message: 'Something Went Wrong! ' });
  }
};
