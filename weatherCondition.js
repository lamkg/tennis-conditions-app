import React from 'react';
import thumbsUp from './assets/thumb-up-fill.svg';
import caution from './assets/alert-triangle.svg';
import negative from './assets/slash.svg';

const weatherCondition = (currentWeather) => {
  // wrote this in older format because VS code initially was screaming at me when I wrote it
  // in ?. format
  const temperature =
    currentWeather && currentWeather.main && currentWeather.main.temp;
  const windSpeed =
    currentWeather && currentWeather.wind && currentWeather.wind.speed;
  const gust =
    currentWeather && currentWeather.wind && currentWeather.wind.gust;

  // conditions that players would want to take note of.
  if (
    temperature >= 50 &&
    temperature <= 85 &&
    windSpeed <= 18 &&
    (!gust || gust < 20)
  ) {
    return (
      <>
        <img src={thumbsUp} alt="Thumbs up" />
        <p>It's not too cold or too hot, not too windy, great for tennis!</p>
      </>
    );
  } else if (windSpeed >= 25 || gust >= 28) {
    return (
      <>
        <img src={negative} alt="do not go" />
        <p>Today is not a good day for tennis.</p>
      </>
    );
  } else if (windSpeed >= 18 || gust >= 20) {
    return (
      <>
        <img src={caution} alt="caution sign" />
        <p>
          Today isn't optimal but could be playable. It might be too windy
          though.
        </p>
      </>
    );
  } else if (temperature <= 50) {
    return (
      <>
        <img src={caution} alt="caution sign" />
        <p>
          Today seems a bit too cold. Dress warmly if you're going outside to
          play.
        </p>
      </>
    );
  } else if (temperature >= 85) {
    return (
      <>
        <img src={caution} alt="caution sign" />
        <p>
          Today is really hot. Make sure to stay hydrated and cool if you want
          to play.
        </p>
      </>
    );
  } else {
    return (
      <>
        <img src={negative} alt="do not go" />
        <p>Today is not a good day for tennis.</p>
      </>
    );
  }
};

export default weatherCondition;
