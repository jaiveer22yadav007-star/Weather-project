import React from 'react';

const WeatherDisplay = ({ data }) => {
  if (!data) {
    return null;
  }

  const { name, main, weather, wind, sys, visibility } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="weather-display">
      <div className="weather-main">
        <div>
          <h2>{name}</h2>
          <p style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>{weather[0].description}</p>
        </div>
        <img src={iconUrl} alt={weather[0].description} />
        <p>{Math.round(main.temp)}°C</p>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <strong>Feels Like:</strong> {Math.round(main.feels_like)}°C
        </div>
        <div className="detail-item">
          <strong>Humidity:</strong> {main.humidity}%
        </div>
        <div className="detail-item">
          <strong>Wind Speed:</strong> {wind.speed} m/s
        </div>
        <div className="detail-item">
          <strong>Visibility:</strong> {visibility / 1000} km
        </div>
        <div className="detail-item">
          <strong>Sunrise:</strong> {formatTime(sys.sunrise)}
        </div>
        <div className="detail-item">
          <strong>Sunset:</strong> {formatTime(sys.sunset)}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;