// Importing required modules and components
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import useGeocoding from "../../query/useGeocoding";
import { Place } from "../../pages/HomePage";

// Styled component for search input and suggestions list
const SearchWrapper = styled.div`
  position: relative;
  input {
    padding: 1rem;
    outline: none;
    font-size: 1rem;
    box-sizing: border-box;
    border: 1px solid var(--complementaryColor);
    text-shadow: none;
    width: 100%;
    border-radius:20 px;
  }
  ul {
    text-shadow: none;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.5);
    background-color: white;
    position: absolute;
    top: calc(100% + 25px);
    max-width: calc(100vw - 50px);
    left: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    color: black;
    z-index: 2;
    li {
      cursor: pointer;
      display: flex;
      padding: 1rem;
      p {
        margin: 0;
        width: max-content;
      }
      &.selected {
        background-color: var(--primaryLighterColor);
      }
      @media (hover: hover) {
        &:hover {
          background-color: var(--primaryLighterColor);
        }
      }
    }
  }
`;

// Define the props interface for SearchPlace component
interface Props {
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}

// Component for searching places using geocoding API
const SearchPlace: React.FC<Props> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, isLoading, isError, status, refetch, error } =
    useGeocoding(inputValue);

    // Fetch new geocoding results on input change with a slight delay
    useEffect(() => {
    setSelectedIndex(0);
    const timeout = setTimeout(refetch, 250);
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  // Close suggestions list if user clicks outside the component
  function clickOutsideHandler(e: MouseEvent) {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  }
  useEffect(() => {
    window.addEventListener("click", clickOutsideHandler);
    return () => {
      window.removeEventListener("click", clickOutsideHandler);
    };
  });

  // Format place names for display
  function returnFullName(
    name: string,
    admin1: string | undefined,
    countryCode: string
  ) {
    return admin1
      ? `${name.toUpperCase()}, ${admin1}, ${countryCode}`
      : `${name.toUpperCase()}, ${countryCode}`;
  }

  // Confirm selection of a place
  function confirmPlace(index: number) {
    if (!data?.data.results || !data.data.results[index]) return;
    setSelectedIndex(index);
    setShowSuggestions(false);
    inputRef.current && inputRef.current.blur();
    const result = data.data.results[index];

    const place: Place = {
      latitude: result.latitude,
      longitude: result.longitude,
      name: returnFullName(result.name, result.admin1, result.country_code),
    };
    props.setPlace(place);
  }
  
  // Handle keyboard navigation for suggestions list
  function keydownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.code) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((index) =>
          data?.data.results && data.data.results.length > index + 1
            ? index + 1
            : index
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((index) => (index > 0 ? index - 1 : index));
        break;
      case "Enter":
        confirmPlace(selectedIndex);
        break;

      default:
        break;
    }
  }

  return (
    
    <SearchWrapper ref={wrapperRef}>
      
      {/* Input field for searching places */}
      <input
        ref={inputRef}
        placeholder="search place"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => {
          setShowSuggestions(true);
        }}
        onKeyDown={keydownHandler}
      />
      {/* Suggestions list */}
      <ul>
        {showSuggestions &&
          data &&
          data.data.results?.map((geocoding, index) => (
            <li
              key={geocoding.id}
              onClick={() => {
                confirmPlace(index);
              }}
              className={index === selectedIndex ? "selected" : ""}
            >
              <p>
                {returnFullName(
                  geocoding.name,
                  geocoding.admin1,
                  geocoding.country_code
                )}
              </p>
            </li>
          ))}
      </ul>
    </SearchWrapper>
  );
};

export default SearchPlace;
