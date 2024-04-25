import { useState, useEffect } from "react";
import "./CurrentWeather.css";

function CurrentWeather({ data, children }) {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    // Function to update current time
    const updateTime = () => {
      const currentDate = new Date();
      let currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      const period = currentHour < 12 ? "am" : "pm";
      currentHour =
        currentHour === 0
          ? 12
          : currentHour > 12
          ? currentHour - 12
          : currentHour;
      const formattedHour = String(currentHour).padStart(2, "0");
      const formattedMinute = String(currentMinute).padStart(2, "0"); // Ensure two digits for minutes
      setCurrentTime(`${formattedHour}:${formattedMinute} ${period}`);
    };

    // Update the time immediately and then every minute
    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  //Sunrise-Sunset time
  const sunriseTimestamp = data.city.sunrise;
  const sunsetTimestamp = data.city.sunset;
  // Convert Unix timestamps to milliseconds
  const sunriseMilliseconds = sunriseTimestamp * 1000;
  const sunsetMilliseconds = sunsetTimestamp * 1000;

  // Create Date objects with the milliseconds
  const sunriseDate = new Date(sunriseMilliseconds);
  const sunsetDate = new Date(sunsetMilliseconds);

  // Format the date and time
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const sunriseTime = sunriseDate.toLocaleTimeString("en-US", options); // Converts to Indian time
  const sunsetTime = sunsetDate.toLocaleTimeString("en-US", options); // Converts to Indian time

  //Current Temperature
  let currentTemp = data.list[0].main.temp - 273.15;
  currentTemp = currentTemp.toFixed(0);

  //current weather
  let weather = data.list[0].weather[0].description;
  weather = weather.toUpperCase();

  //current date and time
  const currentDate2 = new Date();
  const dayIndex = currentDate2.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[dayIndex];
  const date = currentDate2.getDate();

  //weather icon
  const Weathericon = data.list[0].weather[0].icon;

  return (
    <div className="currentContainer">
      {children}
      <div className="city">
        <p>{data.city.name}</p>
        <img src="/images/trend.png" />
      </div>
      <div className="status-cont">
        <div className="temp-cont">
          <p className="temp">{currentTemp}&deg;C</p>
          <p className="weath">{weather}</p>
          <p className="date">
            {dayName} {date} . {currentTime}{" "}
          </p>
        </div>
        <div className="main-icon">
          <img src={`/images/${Weathericon}.svg`} />
        </div>
      </div>
      <div className="sun-cont">
        <div className="sunrise">
          <div className="icon">
            <img src="/images/01d.svg" />
          </div>
          <div className="txt">
            <p
              className="date"
              style={{ textAlign: "left", marginLeft: "0.3rem" }}
            >
              Sunrise
            </p>
            <p
              className="weath"
              style={{ textAlign: "left", marginLeft: "0.3rem" }}
            >
              {sunriseTime}
            </p>
          </div>
        </div>
        <div className="sunrise">
          <div className="icon">
            <img src="/images/02d.svg" />
          </div>
          <div className="txt">
            <p
              className="date"
              style={{ textAlign: "left", marginLeft: "0.3rem" }}
            >
              Sunset
            </p>
            <p
              className="weath"
              style={{ textAlign: "left", marginLeft: "0.3rem" }}
            >
              {sunsetTime}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="windHum">
        <div className="wind">
          <p className="speed">Wind Speed</p>
          <p className="value">{data.list[0].wind.speed}</p>
        </div>
        <div className="wind">
          <p className="speed">Humidity</p>
          <p className="value">{data.list[0].main.humidity}</p>
        </div>
      </div>
      <hr />
      <div className="windHum">
        <div className="wind">
          <p className="speed">Min-Temp</p>
          <p className="value">
            {(data.list[0].main.temp_min - 273.15).toFixed(0)}&deg;C{" "}
          </p>
        </div>
        <div className="wind">
          <p className="speed">Max-Temp</p>
          <p className="value">
            {(data.list[0].main.temp_max - 273.15).toFixed(0)}&deg;C
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
