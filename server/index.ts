

import express  from 'express' 
import {errHandler, requestLogger} from './Middlewares/loggers'
import asyncHandler from "express-async-handler"
import { getCityCurrentWeather , getCityForecastWeather} from './Handlers/cityWeather';
import dotenv from  'dotenv' ; 

// TODO : Unit Tests for the apis 
// TODO : Add a cache layer for the api calls
// TODO : Add a rate limiter for the api calls
// TODO : Add a docker file for the server


(
    async ()=> {
        const app = express() ; 
        app.use(express.json())
        app.use(requestLogger)
        app.use(errHandler)
        dotenv.config()
        // public endpoints 
        app.get('/v1/currentWeather'  , asyncHandler(getCityCurrentWeather) )
        app.get('/v1/5-DayWeatherForecast'  , asyncHandler(getCityForecastWeather) )

        app.listen(8080)
        console.log('Server is running http://localhost:8080')
    }
) ()


