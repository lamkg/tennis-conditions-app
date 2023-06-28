import React, { useState, useEffect } from 'react';
import {
  WEATHER_API_URL,
  WEATHER_API_KEY,
  GEO_API_URL,
  geoApiOptions,
} from './api';
import Forecast from './forecast';
import weatherCondition from './weatherCondition';
import Search from './search';

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [location, setLocation] = useState('San Francisco');
  const [forecast, setForecast] = useState({});

  // search function for location
  const searchLocation = (event) => {
    if (event?.key === 'Enter' || event?.type === 'click') {
      setLocation(event.target.value);
      console.log('location:', event.target.value);
      // API fetch weather
      fetchWeatherData();
    }
  };

  // Fetches weather data based on the location
  const fetchWeatherData = () => {
    fetch(
      `${WEATHER_API_URL}/weather?q=${location}&appid=${WEATHER_API_KEY}&units=imperial`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentWeather({ name: location, ...data });
      })
      .catch((error) => {
        console.log('An error occurred:', error);
      });

    console.log('fetching weather date for location', location);

    fetch(
      `${WEATHER_API_URL}/forecast?q=${location}&appid=${WEATHER_API_KEY}&units=imperial`
    )
      .then((response) => response.json())
      .then((data) => {
        setForecast({ name: location, ...data });
      })
      .catch((error) => {
        console.log('An error occurred:', error);
      });
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const handleOnSearchChange = (searchData) => {
    let selectedLocation = setLocation(searchData.label);
    searchLocation(location);
    fetchWeatherData(selectedLocation);
  };

  return (
    <div className="app">
      <h1 className="title"> Should I Play Tennis Today </h1>
      <div className="search">
        <Search onSearchChange={handleOnSearchChange} />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{currentWeather.name}</p>
          </div>
          <div className="temp">
            {currentWeather.main ? (
              <h1>{currentWeather.main.temp.toFixed()}°F</h1>
            ) : null}
          </div>
          <div className="description">
            {currentWeather.weather ? (
              <p>{currentWeather.weather[0].main}</p>
            ) : null}
          </div>
        </div>

        {currentWeather.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {currentWeather.main ? (
                <p className="bold">
                  {currentWeather.main.feels_like.toFixed()}°F
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="feels">
              {currentWeather.main ? (
                <p className="bold">
                  {currentWeather.main.temp_min.toFixed()}°F
                </p>
              ) : null}
              <p>min</p>
            </div>
            <div className="feels">
              {currentWeather.main ? (
                <p className="bold">
                  {currentWeather.main.temp_max.toFixed()}°F
                </p>
              ) : null}
              <p>max</p>
            </div>
            <div className="humidity">
              {currentWeather.main ? (
                <p className="bold">{currentWeather.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {currentWeather.wind ? (
                <p className="bold">
                  {currentWeather.wind.speed.toFixed()} MPH
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
            <div className="wind">
              {currentWeather.wind ? (
                <p className="bold">
                  {currentWeather.wind.gust
                    ? currentWeather.wind.gust.toFixed()
                    : 0}{' '}
                  MPH
                </p>
              ) : null}
              <p>Gust</p>
            </div>
          </div>
        )}
        <div className="sauce">
          {currentWeather.name !== undefined && (
            <p>{weatherCondition(currentWeather)}</p>
          )}
        </div>
        <div>{forecast && forecast.list && <Forecast data={forecast} />}</div>
      </div>
    </div>
  );
}

export default App;
