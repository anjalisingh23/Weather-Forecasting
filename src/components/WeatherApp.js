import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define a function to fetch weather data
    const fetchWeatherData = async () => {
      try {
        // Make a GET request to the OpenWeatherMap API
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=c70b759d9bfbbeaff4415e7cad60374c'
        );

        // Update the state with the fetched weather data
        setWeatherData(response.data);
        setIsLoading(false);
      } catch (error) {
        // Handle errors
        setError(error);
        setIsLoading(false);
      }
    };

    // Call the fetchWeatherData function
    fetchWeatherData();
  }, []); // Empty dependency array ensures the effect runs only once

  // Render loading state while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render weather data
  return (
    <div>
      <h1>Weather Data</h1>
      <pre>{JSON.stringify(weatherData, null, 2)}</pre>
    </div>
  );
}

export default WeatherApp;
