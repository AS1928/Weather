// Importing required libraries and components
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useWeather from "../../query/useWeather";
import CurrentWeather from "../../components/CurrentWeather";
import DailyWeather from "../../components/DailyWeather";
import Options from "../../components/Options";

// Styled component for displaying messages (e.g., loading, error)
const Msg = styled.div`
  h2 {
    font-weight: normal;
  }
`;

// Defining the Place interface for location details
export interface Place {
  latitude: number;
  longitude: number;
  name: string;
}

const HomePage = () => {
  // State for metric units (Celsius/Fahrenheit) and selected place
  const [metric, setMetric] = useState(true);
  const [place, setPlace] = useState<Place>({
    latitude: 19.07283,
    longitude: 72.88261,
    name: "MUMBAI, Maharashtra, IN",
  });

  // Fetching weather data using the custom useWeather hook
  const { data, isLoading, isError, error } = useWeather(
    place.latitude,
    place.longitude,
    metric
  );

  return (
    <>
    
      {/* Options component to change metric units and location */}
      <Options setMetric={setMetric} setPlace={setPlace} />
      {/* Loading state */}
      {isLoading && (
        <Msg>
          <h2>Loading...</h2>
        </Msg>
      )}
      {/* Error state */}
      {isError && (
        <Msg>
          <h2>Something went wrong...</h2>
          <p>
            Error:{" "}
            {error instanceof Error
              ? error.message
              : " the app could not fetch the data from the server"}
          </p>
        </Msg>
      )}
      
      {/* Display weather data if available */}
      {data?.data && (
        <>
          <CurrentWeather weatherData={data.data} place={place} />
          <DailyWeather weatherData={data.data} />
        </>
      )}
    </>
  );
};

export default HomePage;
