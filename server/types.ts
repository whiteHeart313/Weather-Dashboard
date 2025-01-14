/* Type checking */

import type { RequestHandler } from "express"

export type  typeValidation<req , res>  = RequestHandler<
any,
Partial<message<res>> , 
Partial<req> , 
any
> 

export type message<T> = T & {message : string }
export interface cityWeatherResponse { 
    cityName : string , 
    currentTemprature: string , 
    weatherDescription : string , 
    humidityLevel : string, 
    windSpeed : string 
}
export type userRequestWeather = Pick<cityWeatherResponse , 'cityName'>