

import express  from 'express' 
import {requestLogger} from './Middlewares/requestLogger'
import asyncHandler from "express-async-handler"
import { getCityCurrentWeather , getCityForecastWeather} from './Handlers/cityWeather';
import dotenv from  'dotenv' ; 

(
    async ()=> {
        const app = express() ; 
        app.use(express.json())
        app.use(requestLogger)
        dotenv.config()
        // public endpoints 
        app.get('/v1/currentWeather'  , asyncHandler(getCityCurrentWeather) )
        app.get('/v1/5-DayWeatherForecast'  , asyncHandler(getCityForecastWeather) )

        app.listen(8080)
        console.log('Server is running http://localhost:8080')
    }
) ()


