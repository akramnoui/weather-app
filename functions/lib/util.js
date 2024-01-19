"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeatherAlerts = exports.featchWeatherForescast = void 0;
// Simple fetch function for Cloud Function
const apiKey = "fa049bb9ba754cf49b5193303230307";
const apiCall = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error in API call:", error);
        return null;
    }
};
// Function to fetch weather forecast in the Cloud Function
const featchWeatherForescast = async (params) => {
    const endpoint = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=yes`;
    return apiCall(endpoint);
};
exports.featchWeatherForescast = featchWeatherForescast;
const fetchWeatherAlerts = async (params) => {
    const endpoint = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&aqi=nor&alerts=yes`;
    return apiCall(endpoint);
};
exports.fetchWeatherAlerts = fetchWeatherAlerts;
//# sourceMappingURL=util.js.map