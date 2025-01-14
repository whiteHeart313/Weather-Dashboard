

import express  from 'express' 
import {requestLogger} from './Middlewares/requestLogger'
import asyncHandler from "express-async-handler"
import { getCityWeather } from './Handlers/cityWeather';

(
    async ()=> {
        const app = express() ; 
        app.use(express.json())
        app.use(requestLogger)

        // public endpoints 
        app.get('/v1/currentWeather'  , asyncHandler(getCityWeather) )
        app.get('/v1/n-DayWeatherForecast'  , asyncHandler(()=> console.log()) )

        app.listen(8080)
        console.log('Server is running http://localhost:8080')
    }
) ()


