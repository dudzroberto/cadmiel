import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  body, button, input {
    font-size: 12px !important;
  }

  h1 {
    font-size: 2rem;
  }

  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  
  body {
    font-family: 'Lexend Deca', sans-serif;
  }
`;

export default GlobalStyle;
