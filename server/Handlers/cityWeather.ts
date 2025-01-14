import  { cityWeatherResponse, typeValidation, userRequestWeather } from "../types";

const axios = require('axios');

export const getCityWeather : typeValidation <userRequestWeather , cityWeatherResponse>= async (req , res ) => {
    
    const { cityName } = req.body;

    if (!cityName) {
        res.status(400).send({ message: "City name is required" });
        return ; 
    }
    try {
        const apiKey = process.env.OPEN_WEATHER_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);

        const weatherData: cityWeatherResponse = {
            cityName: response.data.name,
            currentTemprature: `${response.data.main.temp} °C`,
            weatherDescription: response.data.weather[0].description,
            humidityLevel: `${response.data.main.humidity} %`,
            windSpeed: `${response.data.wind.speed} m/s`
        };

        res.status(200).send(weatherData);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch weather data" });
    }

} 
