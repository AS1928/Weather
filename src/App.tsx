// Importing required libraries and components
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { createGlobalStyle } from "styled-components";

import logo from './assets/logo.png';

import HomePage from "./pages/HomePage";


// Global styles applied to the header of application
const Header = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  h1 {
    font-size: 2.5rem;
    margin: 0;
    color: white;
    text-shadow: 0 0 5px hsla(0, 0%, 0%, 0.5);
    text-align: center;
  }
`;

// Global styles applied to the entire application
const GlobalStyles = createGlobalStyle`
  html,body {
    margin: 0;
    padding: 0;
    color: white;
    font-family: Montserrat, sans-serif;
  }
  body {
    --primaryColor: #425bd8;
    --primaryDarkerColor: #1a2b80;
    --primaryLighterColor: #758CFF;
    --complementaryColor: #EDC855;
    text-shadow: 0 0 5px hsla(0, 0%, 0%, 0.5);
    min-height: 100vh;
    background-attachment: fixed;
    background-image: linear-gradient(165deg, var(--primaryLighterColor), var(--primaryDarkerColor));
  }
  button {
    text-shadow: 0 0 5px hsla(0, 0%, 0%, 0.5);
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  a {
    text-decoration: none;
    color: inherit
  }
`;

// Styling for the main application wrapper
const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Styling for the main content area of the application
const Main = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 25px;
  box-sizing: border-box;
`;

// Styling for the footer section
const Footer = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: hsla(0, 0%, 100%, 0.5);
  }
  a {
    opacity: 0.8;
    color: var(--complementaryColor);
  }
`;

/**
 * Main App component that wraps the entire application.
 * Uses React Query for server state management.
 */
function App() {
  // Initializing a new QueryClient instance
  const queryClient = new QueryClient();

  return (
    <>
      {/* Wrapping the app with QueryClientProvider to provide access to React Query */}
      <QueryClientProvider client={queryClient}>
        <AppWrapper>
          <Header>
            <img src={logo} alt="Logo" style={{ height: '50px' }} />
            <h1>
              Weatherly
            </h1>
          </Header>  
          <GlobalStyles />          {/* Applying global styles */}
          <Main>          {/* Main content section */}
            <HomePage />
          </Main>
          <Footer>        {/* Footer section with a message */}
            <p>
              Created by Ayush
            </p>
          </Footer>
          {/* <ReactQueryDevtools position="bottom-right" /> */}        {/* provides a UI to inspect and debug React Query's cache, queries, and mutations. which helps in debugging*/}
        </AppWrapper>
      </QueryClientProvider>
    </>
  );
}

export default App;
