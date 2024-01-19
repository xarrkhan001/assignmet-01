 // src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // or import 'tailwindcss/tailwind.css'; if using Tailwind

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '87f65fdee4b6678190fd9893063ee7b7'; // Replace with your OpenWeatherMap API key
 
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Weather App</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={fetchWeatherData}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Get Weather'}
        </button>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {weatherData && weatherData.main && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
