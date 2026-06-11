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
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${parkBg});
    background-size: cover; /* or 150vw depending on zoom requirement, cover usually handles zooming to fit */
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: #ffffff;
    overflow: hidden;
    height: 100dvh;
    width: 100svw;
  }

  @media (max-width: 768px) {
    body {
      background-attachment: fixed;
    }
  }

  button {
    font-family: 'Inter', sans-serif;
  }
`;

