// Importing required modules and components
import React from "react";
import styled from "styled-components";
import { Place } from "../../pages/HomePage";
import SearchPlace from "../../components/SearchPlace";
import FindMe from "../../components/FindMe";

// Styled components for the navigation bar and its elements
const Bar = styled.nav`
  display: flex;
  justify-content: space-between;
`;
const Row = styled.div`
  display: flex;
  margin-bottom: 25px;
`;
const Buttons = styled.div`
  display: flex;
  font-size: 1.5rem;
  padding: 9px 0;
  box-sizing: border-box;
  button {
    padding: 0 0.5rem;
    transition: color 250ms;
    @media (hover: hover) {
      &:hover {
        color: var(--complementaryColor);
      }
    }
  }
`;

// Define the props interface for the Options component
interface Props {
  setMetric: React.Dispatch<React.SetStateAction<boolean>>;
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}

// Component for search, geolocation, and unit toggles (°C/°F)
const Options: React.FC<Props> = (props) => {
  return (
    <Bar>
      <Row>
        {/* Input components for location */}
        <SearchPlace setPlace={props.setPlace} />
        <FindMe setPlace={props.setPlace} />
      </Row>
      <Row>
        {/* Buttons to toggle between Celsius and Fahrenheit */}
        <Buttons>
          <button
            onClick={() => {
              props.setMetric(true);
            }}
          >
            &deg;C
          </button>
          |
          <button
            onClick={() => {
              props.setMetric(false);
            }}
          >
            &deg;F
          </button>
        </Buttons>
      </Row>
    </Bar>
  );
};

export default Options;
