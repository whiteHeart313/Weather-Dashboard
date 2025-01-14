

import express , {RequestHandler} from 'express' 
import {requestLogger} from './Middlewares/requestLogger'
import asyncHandler from "express-async-handler"

(
    async ()=> {
        const app = express() ; 
        app.use(express.json())
        app.use(requestLogger)

        // public endpoints 
        app.get('/v1/currentWeather'  , asyncHandler(getCityWeather) )
        app.get('/v1/n-DayWeatherForecast'  , asyncHandler(()=> console.log()) )


    }
) ()

function getCityWeather(...args: unknown[]): void | Promise<void> {
    throw new Error('Function not implemented.');
}
