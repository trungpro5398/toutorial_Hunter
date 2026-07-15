/*
    Main logic controller for the project
    Connects async lookup to React state

    Async as does not instantly produce result -> app enters temporary loading state, waiting for fetchWeatherByCity,
    then updates to success/empty/error (which then produces result)
*/

import { useState } from "react";
import { fetchWeatherByCity } from "../services/weatherClient";
import type { RequestStatus, WeatherResult } from "../types/weather";

export function useWeatherSearch() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<RequestStatus>("idle");
    const [weather, setWeather] = useState<WeatherResult | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [validationMessage, setValidationMessage] = useState<string | null>(null);

    function updateQuery(value: string) {
        setQuery(value);
        setValidationMessage(null);
    }

    function clearWeather() {
        setWeather(null);
        setStatus("idle");
        setErrorMessage(null);
        setValidationMessage(null);
    }

    async function searchWeather() {
        const submittedCity = query.trim();
        // Saves city for processing and then clears input box

        if (submittedCity === "") {
            setValidationMessage("Enter a city name first.");
            return
            }

        setStatus("loading");
        setErrorMessage(null);
        setValidationMessage(null);
        setQuery(""); // Clear input box

        try {
            const searchedWeather = await fetchWeatherByCity(submittedCity);
            if (searchedWeather === null) {
                setStatus("empty");
                return;
                }

            setWeather(searchedWeather);
            setStatus("success");
            setErrorMessage(null);

                }

        catch {
            setErrorMessage("There was an error in the program. Please try again.");
            setStatus("error");
                }
        }

    return {
            query,
            setQuery: updateQuery,
            status,
            weather,
            errorMessage,
            validationMessage,
            searchWeather,
            clearWeather,
        }

    }
