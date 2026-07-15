/*
    Cleans up the user’s input before the app tries to search for a matching city (normalisation)
*/

export function normaliseCity(cityName: string) {
    const cleaned_city = cityName.trim().toLowerCase() // Removes extra spaces and Changes to lowercase
    return cleaned_city; // Not deep copy???
    }