// Importing required modules and components
import React from "react";
import styled from "styled-components";
import { Place } from "../../pages/HomePage";
import { WeatherData } from "../../query/useWeather";
import getWeatherDescr from "../../utils/getWeatherDescr";
import getTime from "../../utils/getTime";
import WeatherIcon from "../WeatherIcon";

// Styling for the main wrapper that holds the current weather details
const Wrapper = styled.section`
  word-break: break-word;
  background-color: hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

// Styling for each column displaying weather parameters
const Column = styled.div`
  margin: 25px;
  &.right {
    display: flex;
    flex-wrap: wrap;
  }
  .parameters {
    font-size: 1rem;
    p {
      margin-bottom: 0;
    }
  }
  .rightNow {
    opacity: 0.5;
    margin-top: 0;
  }
  .image {
    max-width: 150px;
    margin-left: auto;
    margin-top: auto;
  }
  .sunTime {
    display: flex;
    span {
      margin-right: 1rem;
    }
  }
`;

// Styling for the location section displaying place and coordinates
const Location = styled.div`
  margin-bottom: 50px;
  .coords {
    display: flex;
    flex-wrap: wrap;
    opacity: 0.5;
    p {
      font-size: 0.8rem;
      margin: 0;
      margin-right: 1rem;
    }
  }
  .place {
    margin: 0;
    font-weight: normal;
    font-size: 2rem;
  }
  .time {
    font-weight: normal;
    margin-top: 0;
    font-size: 1.2rem;
    color: var(--complementaryColor);
  }
`;

// Type definition for the current weather data
type CurrentWeather = WeatherData["current_weather"];

// Component Props definition
interface Props {
  weatherData: WeatherData;
  place: Place;
}

// Functional component to display current weather information
const CurrentWeather: React.FC<Props> = (props) => {
  const currentWeather = props.weatherData.current_weather;
  const daily = props.weatherData.daily;
  const dailyUnits = props.weatherData.daily_units;

  // Formatter to convert the ISO date to a readable format
  const currentTimeFormatter = new Intl.DateTimeFormat("en-us", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  
  // Function to get the current time in a formatted string
  function getCurrentTime(isoDate: string) {
    const date = new Date(isoDate);
    date.setMinutes(new Date().getMinutes());
    return currentTimeFormatter.format(date);
  }

  // Function to check if the current time is during night based on sunrise/sunset times
  function checkNight(isoDate: string, isoSunrise: string, isoSunset: string) {
    const now = new Date(isoDate);
    now.setMinutes(new Date().getMinutes());
    const sunrise = new Date(isoSunrise);
    const sunset = new Date(isoSunset);
    return now < sunrise || now > sunset;
  }

  return (
    <Wrapper>
      {/* Displaying location details like coordinates, place name, and time */}
      <Column>
        <Location>
          <div className="coords">
            <p>latitude: {props.place.latitude}</p>
            <p>longitude: {props.place.longitude}</p>
          </div>
          <h1 className="place">{props.place.name}</h1>
          <h2 className="time">{getCurrentTime(currentWeather.time)}</h2>
        </Location>

        {/* Displaying daily weather parameters like temperature, windspeed, precipitation and sunrise time and sunset time */}
        <div className="parameters">
          <p>
            <i className="bi bi-arrow-up-short"></i>highest temperature:
            {` ${daily.temperature_2m_max[0]} ${dailyUnits.temperature_2m_max} `}
            ( apparent:
            {` ${daily.apparent_temperature_max[0]} ${dailyUnits.apparent_temperature_max} `}
            )
          </p>
          <p>
            <i className="bi bi-arrow-down-short"></i>lowest temperature:
            {` ${daily.temperature_2m_min[0]} ${dailyUnits.temperature_2m_min} `}
            ( apparent:
            {` ${daily.apparent_temperature_min[0]} ${dailyUnits.apparent_temperature_min} `}
            )
          </p>
          <p>
            <i className="bi bi-wind"></i> max wind speed:{" "}
            {`${daily.windspeed_10m_max[0]} ${dailyUnits.windspeed_10m_max} `}
          </p>
          <p>
            <i className="bi bi-moisture"></i> precipitation:{" "}
            {` ${daily.precipitation_sum[0]} ${dailyUnits.precipitation_sum} `}
          </p>
          <p>
            <i className="bi bi-cloud-sun"></i> outside:{" "}
            {getWeatherDescr(daily.weathercode[0])}
          </p>
          <p className="sunTime">
            <span>
              <i className="bi bi-sunrise"></i> sunrise {getTime(daily.sunrise[0])}
            </span>
            <span>
              <i className="bi bi-sunset"></i> sunset {getTime(daily.sunset[0])}
            </span>
          </p>
        </div>
      </Column>

      {/* Displaying current weather conditions and icons */}
      <Column className="right">
        <div className="parameters">
          <p className="rightNow">right now:</p>
          <p>
            <i className="bi bi-cloud-sun"></i> outside:{" "}
            {getWeatherDescr(currentWeather.weathercode)}
          </p>
          <p>
            <i className="bi bi-thermometer-half"></i> temperature:{" "}
            {`${currentWeather.temperature} ${dailyUnits.temperature_2m_max} `}
          </p>
          <p>
            <i className="bi bi-wind"></i> wind speed:{" "}
            {`${currentWeather.windspeed} ${dailyUnits.windspeed_10m_max} `}
          </p>
        </div>
        <WeatherIcon
          weatherCode={currentWeather.weathercode}
          night={checkNight(
            currentWeather.time,
            daily.sunrise[0],
            daily.sunset[0]
          )}
          className="image"
        />
      </Column>
    </Wrapper>
  );
};

export default CurrentWeather;
