import { createGlobalStyle } from 'styled-components';
import parkBg from '../../assets/shipBg.jpg';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(${parkBg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: #ffffff;
    overflow-x: hidden;
    min-height: 100vh;
    width: 100svw;
  }

  @media (max-width: 768px) {
    body {
      background-attachment: scroll;
    }
  }

  button {
    font-family: 'Inter', sans-serif;
  }
`;

