import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  h1,h2,h3,h4,h5,p,a,li{
    font-family: sans-serif;
    text-decoration: none;
    line-height: 1.5;
  }
`;
