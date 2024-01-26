// Simple fetch function for Cloud Function
const apiCall = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    return null;
  }
};

// Function to fetch weather forecast in the Cloud Function
export const featchWeatherForescast =
async (params: { cityName: string; days: string }) => {
  const apiKey = "fa049bb9ba754cf49b5193303230307";
  const endpoint =
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=yes`;
  return apiCall(endpoint);
};
