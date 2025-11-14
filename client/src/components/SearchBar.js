import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch, onLocationSaved }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      onSearch(location);
    }
  };

  const handleSave = async () => {
    if (location) {
      try {
        await axios.post('/api/locations', { name: location });
        alert('Location saved!');
        onLocationSaved(); // This will refresh the list
      } catch (err) {
        alert(err.response?.data?.msg || 'Error saving location. Is the database running?');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a city name"
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleSave}>Save</button>
    </form>
  );
};

export default SearchBar;