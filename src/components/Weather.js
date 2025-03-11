import React, { useState, useEffect } from "react";
import { fetchWeatherData as fetchWeatherDataApi, fetchWeatherForecast as fetchWeatherForecastApi } from "../utils/WeatherApi"; // Import the API functions
import "../Weather.css"; // Optional styling for weather

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // To store forecast data
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [isFahrenheit, setIsFahrenheit] = useState(false); // State to toggle between F and C

  // Fetch weather data and forecast when the location is changed
  useEffect(() => {
    if (location) {
      getWeatherData(location);
      getWeatherForecast(location);
    }
  }, [location]);

  // Function to fetch weather data
  const getWeatherData = async (location) => {
    try {
      const data = await fetchWeatherDataApi(location);
      setWeatherData(data);
      setError(null); // Reset error state
    } catch (err) {
      setError("Error fetching weather data.");
      setWeatherData(null);
    }
  };

  // Function to fetch weather forecast
  const getWeatherForecast = async (location) => {
    try {
      const forecast = await fetchWeatherForecastApi(location);
      console.log("Forecast Data:", forecast); // Add logging to check the data
      setForecastData(forecast);
    } catch (err) {
      setError("Error fetching forecast data.");
      setForecastData(null);
    }
  };

  // Function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  // Function to convert Fahrenheit to Celsius
  const convertToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
  };

  // Function to convert temperature correctly
  const getTemperature = (tempCelsius) => {
    if (isNaN(tempCelsius)) return "N/A"; // Handle invalid or missing data

    // Convert temperature based on the selected unit
    const temperature = isFahrenheit
      ? convertToFahrenheit(tempCelsius)
      : tempCelsius;

    // Return temperature as-is if it is above 0; otherwise, keep it negative
    return temperature > 0
      ? temperature.toFixed(1)
      : `(${Math.abs(temperature).toFixed(1)})`;
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (location) {
      getWeatherData(location);
      getWeatherForecast(location);
    }
  };

  // Toggle between Fahrenheit and Celsius
  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">Weather</h2>

      <form onSubmit={handleSearch} className="weather-search-form">
        <input
          type="text"
          placeholder="Enter a city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="weather-input"
        />
        <button type="submit" className="weather-search-btn">
          Search
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>
            Temperature: {getTemperature(weatherData.main.temp)}°
            {isFahrenheit ? "F" : "C"}
          </p>
          <p>Conditions: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      {forecastData && (
        <div className="weather-forecast">
          <h4>5-Day Forecast:</h4>
          {forecastData.list.slice(0, 5).map((forecast, index) => {
            const temp = forecast.main.temp; // Extract temperature (already in Celsius)
            console.log(`Forecast Temp at index ${index}:`, temp); // Log the temperature to check

            return (
              <div key={index}>
                <p>
                  {new Date(forecast.dt * 1000).toLocaleDateString()} - 
                  {getTemperature(temp)}°{isFahrenheit ? "F" : "C"}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Toggle button to switch between Celsius and Fahrenheit */}
      <button onClick={toggleTemperatureUnit} className="unit-toggle-btn">
        {isFahrenheit ? "Switch to Celsius" : "Switch to Fahrenheit"}
      </button>
    </div>
  );
}

export default Weather;
