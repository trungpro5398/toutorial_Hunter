/*
    Defines the “shapes” of your weather-related data. It does not run app logic. It just tells TypeScript what values
    are allowed.
*/

export type RequestStatus = "idle" | "loading" | "success" | "empty" | "error";

export type WeatherResult = {
    city: string;
    temperature: number;
    condition: string;
    humidity: number;
    };