import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    /* background-color: #0f0f0f; */
    /* background-image: url("src/assets/images/grunge-background-pattern.jpg"); */
    /* background-image: url("src/assets/images/grunge-texture-vintage-background_36662-1731.jpg"); */
    /* background-image: url("src/assets/images/french-stucco.png"); */
    /* background-image: url("src/assets/images/brick-wall-dark.png"); */
    /* background-image: url("src/assets/images/brick-wall.png"); */
    /* background-image: url("src/assets/images/concrete-wall-2.png"); */
    /* background-image: url("src/assets/images/wall-4-light.png"); */
    /* background: url("src/assets/images/wall-4-light.png"), radial-gradient(#333, #000); */
    /* background: url("src/assets/images/wall-4-light.png"), radial-gradient(#666, #000); */
    /* background: url("src/assets/images/texture-background.jpg"), radial-gradient(#928313, #000); */
    /* background: url("src/assets/images/texture-background.jpg"); */
    background: url("src/assets/images/grunge-scratched-cracked-texture-background_dark.jpg");
    /* background-color: rgba(0,0,0,0.8);
    background-blend-mode: darken; */
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export const themeStyle = {
    colors: {
      background: '#0f0f0f',
      primary: '#8aff00',
      danger: '#ff4d4f',
      text: '#ffffff',
    },
};