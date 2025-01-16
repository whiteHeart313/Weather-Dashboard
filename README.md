# Weather API Backend Service

## Overview
This project is a small backend service that integrates with a free weather API to provide weather information to front-end applications or clients in a simple and accessible format.

## Features
- Fetch current weather data based on city name or geographic coordinates.
- Return weather information in a structured JSON format.
- Handle errors gracefully and provide meaningful error messages.

## Technology Stack
- **Programming Language:** JavaScript (TS) (Node.js)
- **Framework:** Express.js
- **Weather API:** [OpenWeatherMap](https://openweathermap.org/api) (or any other free weather API)
- **Database:** Optional (not required for basic functionality)

## Getting Started

### Prerequisites
- Node.js (version 23.6 ) for Node.js Type Stripping
- npm (Node package manager)
- An API key from the chosen weather API provider

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-api-backend.git
   cd weather-api-backend 
2. Install dependencies: 
   ``` npm install ```
3. In .env.example file in the root directory, add your API key
    ``` OPEN_WEATHER_KEY=your_api_key_here ```

## Running the Service
### To start the server, run the following command:

``` npm start   ```
### The service will be available at http://localhost:8080.

### To test the server, run the following command:

``` npm test   ```


### API Endpoints

1. **`/v1/currentWeather` Endpoint**:
   - **Description**: Fetches the current weather data for a specified city.
   - **Method**: GET
   - **Request Body**: ``` {"cityName": "string" } ```

   - **Response**: ```
                  {
            "cityName": "string",
            "currentTemperature": "string",
            "weatherDescription": "string",
            "humidityLevel": "string",
            "windSpeed": "string",
            "latitude": "number",
            "longitude": "number"
               } 
               ```


2. **`/v1/5-DayWeatherForecast` Endpoint**:
   - **Description**: Fetches the 5-day weather forecast data for a specified city, including the average temperature and weather description for each day.
   - **Method**: GET
   - **Request Body**: ```{cityName : string }```
   - **Response**:```[
  {
    "date": "string",
    "averageTemperature": "number",
    "weatherDescription": "string"
  }
]```


