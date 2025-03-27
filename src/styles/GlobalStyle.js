// 📁 styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";
import font from "../assets/fonts/F25_Bank_Printer.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'LogoFont';
    src: url(${font}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
