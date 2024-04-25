import axios from "axios";
import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather.js";
import FollowWeather from "./components/FollowWeather.js";
import SearchBar from "./components/SearchBar.js";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Call handleResize once to set initial value

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("City changed:", city); // Log city changes
    // Define a function to fetch weather data
    const fetchWeatherData = async () => {
      try {
        // Make a GET request to the OpenWeatherMap API
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c70b759d9bfbbeaff4415e7cad60374c`
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
  }, [city]); // Empty dependency array ensures the effect runs only once

  // Render loading state while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="container">
        <CurrentWeather data={weatherData}>
          {isMobile && <SearchBar onSearch={(newcity) => setCity(newcity)} />}
        </CurrentWeather>
        <FollowWeather data={weatherData}>
          {!isMobile && <SearchBar onSearch={(newcity) => setCity(newcity)} />}
        </FollowWeather>
      </div>
    </div>
  );
}

export default App;
