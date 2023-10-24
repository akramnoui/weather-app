import axios from "axios";

import { apiKey } from "../constants";

type forecastEndpoint = {
  cityName: string;
  days: string;
};

type locationsEndpoint = {
  cityName: string;
};

const forecastEndpoint = (params: forecastEndpoint) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationsEndpoint = (params: locationsEndpoint) =>
  `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const featchWeatherForescast = (params: forecastEndpoint) => {
  return apiCall(forecastEndpoint(params));
};

export const featchLocations = (params: locationsEndpoint) => {
  return apiCall(locationsEndpoint(params));
};
