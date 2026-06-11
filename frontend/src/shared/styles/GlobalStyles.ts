import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #0f172a;
    color: #ffffff;
    overflow: hidden;
    height: 100dvh;
    width: 100svw;
  }

  button {
    font-family: 'Inter', sans-serif;
  }
`;

