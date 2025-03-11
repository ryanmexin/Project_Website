import axios from "axios";

// Your OpenWeatherMap API key
const apiKey = "42193eba635f08ba99488a24f47a07ee"; // Replace with your actual API key

// Function to fetch weather data by location
export const fetchWeatherData = async (location) => {
  try {
    // Fetch current weather data for the location
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    return response.data; // Return the data to be used in the component
  } catch (error) {
    throw new Error("Error fetching weather data.");
  }
};

// Function to fetch weather forecast by location (optional)
export const fetchWeatherForecast = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
    );
    return response.data; // Return the forecast data
  } catch (error) {
    throw new Error("Error fetching forecast data.");
  }
};
