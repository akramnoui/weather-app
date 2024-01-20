type Location = {
    name: string;
    country: string;
    cityName: string;
    region: string;
  };
  
  type Weather = {
    current: {
      temp_c: number;
      wind_kph: string;
      humidity: string;
      condition: {
        text: string;
        icon: string;
      };
    };
    location: {
      name: string;
      country: string;
      region: string;
    };
    forecast: {
      forecastday: [
        {
          date: string;
          day: {
            avgtemp_c: string;
            condition: {
              text: string;
            };
          };
          astro: {
            sunrise: string;
          };
        }
      ];
    };
  };
  
  type WeatherImages = {
    [key: string]: any;
  };
  
  type WeatherPT = {
    [key: string]: string;
  };
  
  export { Location, Weather, WeatherImages, WeatherPT };
  