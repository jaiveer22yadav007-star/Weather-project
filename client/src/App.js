import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (location) => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get(`/api/weather/${location}`);
      setWeatherData(response.data);
    } catch (err) {
      setError('Could not fetch weather data. Please try another location.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedLocations = async () => {
    try {
      const response = await axios.get('/api/locations');
      setSavedLocations(response.data);
    } catch (err) {
      console.error('Could not fetch saved locations');
    }
  };

  useEffect(() => {
    fetchSavedLocations();
    fetchWeatherData('London'); // Load a default location
  }, []);

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeatherData} onLocationSaved={fetchSavedLocations} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Loading...</p> : weatherData && <WeatherDisplay data={weatherData} />}
      <div className="saved-locations">
        <h2>Saved Locations</h2>
        <ul>
          {savedLocations.map(loc => (
            <li key={loc._id} onClick={() => fetchWeatherData(loc.name)}>
              {loc.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;