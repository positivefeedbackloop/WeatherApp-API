import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [temperature, setTemperature] = useState("");
  const [location, setLocation] = useState("");

  let api_key = "6872a5b76ab77962ccfa753165ddccac";

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const handleApiResponse = (data) => {
    if (data && data.main && data.main.humidity) {
      setHumidity(data.main.humidity);
    } else {
      console.error("Error: Failed to retrieve humidity data");
    }

    if (data && data.wind && data.wind.speed) {
      setWind(Math.floor(data.wind.speed));
    } else {
      console.error("Error: Unable to set wind speed");
    }

    if (data && data.main && data.main.temp) {
      setTemperature(Math.floor(data.main.temp) + "°F");
    } else {
      console.error("Error: Unable to set temperature");
    }

    if (data && data.name) {
      setLocation(data.name);
    } else {
      console.error("Error: Unable to set location");
    }

    if (data.weather[0].icon in weatherIcons) {
      setWicon(weatherIcons[data.weather[0].icon]);
    } else {
      setWicon(clear_icon);
    }
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=imperial&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    handleApiResponse(data);
  };

  const [wicon, setWicon] = useState(cloud_icon);

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search City" />
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{temperature}</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{wind} mp/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
