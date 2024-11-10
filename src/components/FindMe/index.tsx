// Importing required modules and components
import React from "react";
import { Place } from "../../pages/HomePage";
import styled from "styled-components";

// Styled button component for the "Find Me" feature that shows weather of your current location
const FindMeButton = styled.button`
  font-size: 2rem;
  margin-left: 1rem;
  color: var(--complementaryColor);
  &:hover {
    color: var(--primaryColor); 
    transform: scale(1.1); 
   &:hover::after {
    content: "Weather at your location";
    position: absolute;
    top: 120%; 
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7); 
    color: #fff; 
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    white-space: nowrap;
    font-size: 1rem;
    opacity: 1;
    pointer-events: none;
  }

  &:hover::before {
    content: "";
    position: absolute;
    top: 100%; 
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
  }
`;

// Define the props interface to set the user's location
interface Props {
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}

// Component to fetch the user's current location
const FindMe: React.FC<Props> = (props) => {
  // Callback on successful geolocation retrieval
  function successCallback(position: GeolocationPosition) {
    props.setPlace({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      name: "YOUR LOCATION",
    });
  }
  // Callback if geolocation access fails
  function errorCalback() {
    window.alert("The website has no access to your localization");
  }

  // Function to request the user's geolocation
  function findMeHandler() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCalback);
  }
  return (
    <FindMeButton onClick={findMeHandler}>
      <i className="bi bi-geo-alt"></i>
    </FindMeButton>
  );
};

export default FindMe;