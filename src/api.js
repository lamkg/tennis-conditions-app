export const geoApiOptions = {
  method: 'GET',
  params: { countryIds: 'US' },
  headers: {
    'X-RapidAPI-Key': 'process',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export const WEATHER_API_KEY = '509bf9a95a92443750e49b1ac4735edc';
