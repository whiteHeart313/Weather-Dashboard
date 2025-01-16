import { Request, Response } from "express";
import axios from "axios";
import {
  getCityCurrentWeather,
  getCityForecastWeather,
} from "../Handlers/cityWeather"; // Adjust the import path

jest.mock("axios");

describe("Weather Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        cityName: "London",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  describe("getCityCurrentWeather", () => {
    it("should return current weather for a valid city", async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: {
          name: "London",
          main: { temp: 15, humidity: 80 },
          weather: [{ description: "Clear sky" }],
          wind: { speed: 5 },
        },
      });

      await getCityCurrentWeather(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        cityName: "London",
        currentTemprature: 15,
        weatherDescription: "Clear sky",
        humidityLevel: 80,
        windSpeed: 5,
      });
    });

    it("should return 400 if city name is not provided", async () => {
      req.body.cityName = "";

      await getCityCurrentWeather(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "City name is required",
      });
    });

    it("should handle axios errors", async () => {
      (axios.get as jest.Mock).mockRejectedValue({
        response: { data: { message: "City not found" } },
      });

      await getCityCurrentWeather(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: "City not found",
      });
    });

    it("should handle unexpected errors", async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

      await getCityCurrentWeather(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Something Went Wrong! ",
      });
    });
  });

  describe("getCityForecastWeather", () => {
    it("should return forecast weather for a valid city", async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: {
          list: [
            {
              dt_txt: "2022-01-01 12:00:00",
              main: { temp: 10 },
              weather: [{ description: "Partly cloudy" }],
            },
            {
              dt_txt: "2022-01-01 15:00:00",
              main: { temp: 12 },
              weather: [{ description: "Partly cloudy" }],
            },
            {
              dt_txt: "2022-01-02 12:00:00",
              main: { temp: 14 },
              weather: [{ description: "Sunny" }],
            },
          ],
        },
      });

      await getCityForecastWeather(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([
        {
          date: "2022-01-01",
          averageTemperature: "11 °C",
          weatherDescription: "Partly cloudy",
        },
        {
          date: "2022-01-02",
          averageTemperature: "14 °C",
          weatherDescription: "Sunny",
        },
      ]);
    });

    it("should return 400 if city name is not provided", async () => {
      req.body.cityName = "";

      await getCityForecastWeather(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "City name is required",
      });
    });

    it("should handle axios errors", async () => {
      (axios.get as jest.Mock).mockRejectedValue({
        response: { data: { message: "City not found" } },
      });

      await getCityForecastWeather(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: "City not found",
      });
    });

    it("should handle unexpected errors", async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

      await getCityForecastWeather(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Something Went Wrong! ",
      });
    });
  });
});
