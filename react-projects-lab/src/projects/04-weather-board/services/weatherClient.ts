/*
    Acts like fake API client.
    Receives a city name, searches the fake weather data, and returns the matching weather result or nothing.
*/

import { sortedWeatherData } from "../data/sortedWeatherData";
import { normaliseCity } from "../utils/normaliseCity";
import type { WeatherResult } from "../types/weather";

function wait(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Promise - Dont have value yet but will return either WeatherResult or null
// Paired with await in parent function
export async function fetchWeatherByCity(cityName: string): Promise<WeatherResult | null> {
    await wait(600);

    const normalisedCity = normaliseCity(cityName)
    let lowIndex = 0; // binary search here
    let highIndex = sortedWeatherData.length - 1;

    while (lowIndex <= highIndex) {
        const middleIndex = Math.floor((lowIndex + highIndex) / 2);
        const middleWeather = sortedWeatherData[middleIndex];

        if (normalisedCity === middleWeather.city) {
            return middleWeather;
        }

        if (normalisedCity < middleWeather.city) {
            highIndex = middleIndex - 1;
        } else {
            lowIndex = middleIndex + 1;
        }
    }

    return null
    }
