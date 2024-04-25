import { useState, useEffect } from "react";
import "./FollowWeather.css";
import Days from "./Days";
import React from "react";

function FollowWeather({ data, children }) {
  const getDayIndices = (data) => {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== "12"
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  const updateState = (data) => {
    const days = [];
    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 5; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
      });
    }

    return days;
  };

  const days = updateState(data);

  return (
    <div className="followContainer">
      {children}
      <div className="week">
        <div className="this-week">
          <img src="/images/calendar.png" />
          <p> This Week</p>
        </div>
        {days.map((day) => (
          <>
            <Days day={day} />
            <hr />
          </>
        ))}
      </div>
    </div>
  );
}

export default FollowWeather;
