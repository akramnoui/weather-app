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
