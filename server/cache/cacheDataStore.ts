import { RedisClientType } from 'redis';
import { createClient } from 'redis';
import { cityWeatherResponse, DailyForecast } from '../types';

export let redisClient: RedisClientType;
export const setUpRedis = async () => {
  // Set up Redis client
  redisClient = createClient({ url: 'redis://localhost:6379' });
  redisClient.on('error', (err: any) => console.error('Redis Client Error', err));
  await redisClient.connect();
};

export const existInCache = async (path: string, cityName: string) => {
  return (await getFromCache(path, cityName)) !== null;
};

export const setInCache = async (
  path: string,
  cityName: string,
  data: cityWeatherResponse | DailyForecast[]
) => {
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `${path}:${cityName}:${today}`;
  await redisClient.set(cacheKey, JSON.stringify(data), {
    EX: 21600, // 6 h
  });
};

export const getFromCache = async (
  path: string,
  cityName: string
): Promise<cityWeatherResponse | DailyForecast[] | null> => {
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `${path}:${cityName}:${today}`;
  const cachedData = await redisClient.get(cacheKey);
  return cachedData ? (JSON.parse(cachedData) as cityWeatherResponse) : null;
};
