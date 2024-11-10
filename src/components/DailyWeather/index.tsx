// Importing required modules and components
import React from "react";
import styled from "styled-components";
import { WeatherData } from "../../query/useWeather";
import getDate from "../../utils/getDate";
import getWeatherDescr from "../../utils/getWeatherDescr";
import WeatherIcon from "../WeatherIcon";

// Styling for the section containing the title and weather cards
const Tittle = styled.h1`
  font-weight: normal;
`;
const Wrapper = styled.section`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 625px) {
    grid-template-columns: 1fr;
  }
`;

// Styling for each weather card displaying daily forecast
const Card = styled.article`
  background-color: hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  box-sizing: border-box;
  .date {
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--complementaryColor);
    font-size: 1.2rem;
  }
  .image {
    margin-left: auto;
    margin-top: auto;
    max-width: 100px;
  }
  p {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
`;

// Component Props definition
interface Props {
  weatherData: WeatherData;
}

// Functional component to display daily weather forecast
const DailyWeather: React.FC<Props> = (props) => {
  const daily = props.weatherData.daily;
  const dailyUnits = props.weatherData.daily_units;

  // Function to create cards for each day's weather forecast for a week 
  function createCards() {
    let cards: React.ReactElement[] = [];
    for (let i = 1; i < daily.time.length; i++) {
      const card = (
        <Card key={daily.time[i]}>
          <h2 className="date">{getDate(daily.time[i])}</h2>
          <p>
            <i className="bi bi-arrow-up-short"></i>{" "}
            {daily.temperature_2m_max[i]} {dailyUnits.temperature_2m_max} ({" "}
            apparent: {daily.apparent_temperature_max[i]}{" "}
            {dailyUnits.temperature_2m_max} )
          </p>
          <p>
            <i className="bi bi-arrow-down-short"></i>{" "}
            {daily.temperature_2m_min[i]} {dailyUnits.temperature_2m_min} ({" "}
            apparent: {daily.apparent_temperature_min[i]}{" "}
            {dailyUnits.temperature_2m_min} )
          </p>
          <p>
            <i className="bi bi-wind"></i>{" "}
            {`${daily.windspeed_10m_max[i]} ${dailyUnits.windspeed_10m_max} `}
          </p>
          <p>
            <i className="bi bi-moisture"></i>
            {` ${daily.precipitation_sum[i]} ${dailyUnits.precipitation_sum} `}
          </p>
          <p>
            <i className="bi bi-cloud-sun"></i>{" "}
            {getWeatherDescr(daily.weathercode[i])}
          </p>
          <WeatherIcon weatherCode={daily.weathercode[i]} className="image" />
        </Card>
      );
      cards.push(card);
    }
    return cards;
  }

  {/**for printing the cards for next 7 days of the week*/}
  return (
    <>
      <Tittle>Upcomming days:</Tittle>
      <Wrapper>{createCards()}</Wrapper>
    </>
  );
};

export default DailyWeather;
