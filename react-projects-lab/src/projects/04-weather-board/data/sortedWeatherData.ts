/*
    Creates one sorted weather-data copy for binary search.
    This module runs once when imported, not once per query.

    Uses MergeSort (guarantees O(nlogn))
*/

import { weatherData } from "./weatherData";
import type { WeatherResult } from "../types/weather";

function mergeByCity(
  leftCities: WeatherResult[],
  rightCities: WeatherResult[]
) {
  const mergedCities: WeatherResult[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftCities.length && rightIndex < rightCities.length) {
    const leftCity = leftCities[leftIndex];
    const rightCity = rightCities[rightIndex];

    if (leftCity.city.localeCompare(rightCity.city) <= 0) {
      mergedCities.push(leftCity);
      leftIndex += 1;
    } else {
      mergedCities.push(rightCity);
      rightIndex += 1;
    }
  }

  return [
    ...mergedCities,
    ...leftCities.slice(leftIndex),
    ...rightCities.slice(rightIndex),
  ];
}

function mergeSortByCity(cities: WeatherResult[]): WeatherResult[] {
  if (cities.length <= 1) {
    return cities;
  }

  const middleIndex = Math.floor(cities.length / 2);
  const leftCities = mergeSortByCity(cities.slice(0, middleIndex));
  const rightCities = mergeSortByCity(cities.slice(middleIndex));

  return mergeByCity(leftCities, rightCities);
}

export const sortedWeatherData = mergeSortByCity(weatherData);
