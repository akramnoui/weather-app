import axios from "axios";

import { apiKey } from "../constants";

type forecastEndpoint = {
  cityName: string;
  days: string;
};

type locationsEndpoint = {
  cityName: string;
};
type alertsEndpoint = {
  cityName: string;
};

const forecastEndpoint = (params: forecastEndpoint) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=yes`;

const locationsEndpoint = (params: locationsEndpoint) =>
  `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const alertsEndpoint = (params: locationsEndpoint) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&aqi=nor&alerts=yes`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    
    return response.data;
  } catch (error) {
  }
};

export const featchWeatherForescast = (params: forecastEndpoint) => {
  return apiCall(forecastEndpoint(params));
};

export const featchLocations = (params: locationsEndpoint) => {
  return apiCall(locationsEndpoint(params));
};

export const fetchWeatherAlerts = async (params: alertsEndpoint) => {
  const response = await apiCall(alertsEndpoint(params));
  return response;
};

export const checkThresholdAlertsLocally = async (thresholds: any) => {
  const alerts = [];

  // Iterate through each threshold and check for alerts
  for (const threshold of thresholds) {
    const cityName = threshold.city;

    // Fetch weather data for the city
    const weatherData = await featchWeatherForescast({ cityName: cityName,
      days: '7'});

    console.log('weather data', weatherData);
    console.log('threshold data', threshold);


    if (weatherData) {
      // Check each threshold field and compare with weather data
      Object.keys(threshold).forEach((field) => {
        if (field !== "city" && field !== "type") {
          const thresholdValue = threshold[field];
          const thresholdType = threshold.type;
          console.log('threshold value', thresholdType);


          // Map threshold fields to API fields
          const apiFieldMapping = {
            windSpeed: "wind_kph",
            humidityLevel: "humidity",
            temperature: "temp_c",
            precipitation: "precip_mm",
            // Add other fields as needed
          };

          const apiFieldName = apiFieldMapping[field];
          const weatherValue = weatherData.current[apiFieldName];
          console.log('field name weather', apiFieldName, weatherValue);


          if (
            weatherValue !== undefined &&
            thresholdValue !== undefined
          ) {
            switch (thresholdType) {
              case "above":
                if (weatherValue > thresholdValue) {
                  alerts.push({
                    city: cityName,
                    field,
                    value: weatherValue,
                    threshold: thresholdValue,
                  });
                }
                break;
              case "below":
                if (weatherValue < thresholdValue) {
                  alerts.push({
                    city: cityName,
                    field,
                    value: weatherValue,
                    threshold: thresholdValue,
                  });
                }
                break;
              case "equals":
                if (weatherValue === thresholdValue) {
                  alerts.push({
                    city: cityName,
                    field,
                    value: weatherValue,
                    threshold: thresholdValue,
                  });
                }
                break;
              default:
                break;
            }
          }
        }
      });
    }
  }

  return alerts;
};
