import './forecast.css';
import React from 'react';

const Forecast = ({ data }) => {
  const currentDate = new Date();
  const futureDays = {};

  // write a function to find local max min temperature for forecast
  // need to go through all the hourly temps in the forecast response
  const findMinMaxTemperatures = (forecastItems) => {
    let minTemp = Infinity;
    let maxTemp = -Infinity;

    forecastItems.forEach((item) => {
      const temp = item.main.temp;
      if (temp < minTemp) {
        minTemp = temp;
      }
      if (temp > maxTemp) {
        maxTemp = temp;
      }
    });

    return { minTemp, maxTemp };
  };

  // make local dates
  data.list.forEach((item) => {
    const itemDate = new Date(item.dt * 1000).toLocaleDateString();
    //console.log(item)

    if (new Date(itemDate) > currentDate) {
      if (!futureDays[itemDate]) {
        futureDays[itemDate] = item;
      }
    }
  });

  const forecastItems = Object.values(futureDays);
  const temperatures = findMinMaxTemperatures(data.list);

  return (
    <div className="forecast">
      <h2>5-Day Weather Forecast</h2>
      <div className="forecast-items">
        {forecastItems.map((item) => (
          <div key={item.dt} className="forecast-item">
            <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
            <p>
              Range: {temperatures.minTemp.toFixed()}°F -{' '}
              {temperatures.maxTemp.toFixed()}°F
            </p>
            <p>Humidity: {item.main.humidity}%</p>
            <p>Wind Speed: {item.wind.speed.toFixed()} MPH</p>
            <p>Gust: {item.wind.gust ? item.wind.gust.toFixed() : 0} MPH</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
