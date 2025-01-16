/* Type checking */

import type { RequestHandler } from "express";

export type typeValidation<req, res> = RequestHandler<
  any,
  Partial<message<res>>,
  Partial<req>,
  any
>;

export type message<T> = T | { message: string };

export interface cityWeatherResponse {
  cityName: string;
  currentTemprature: number;
  weatherDescription: string;
  humidityLevel: number;
  windSpeed: number;
}
export type userRequestWeather = Pick<cityWeatherResponse, "cityName">;

export interface DailyForecast {
  date: string;
  averageTemperature: string;
  weatherDescription: string;
}
