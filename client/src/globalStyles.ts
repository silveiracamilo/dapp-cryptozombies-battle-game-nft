import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    color: white;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

export const themeStyle = {
  colors: {
    background: '#0f0f0f',
    primary: '#FFF',
    danger: '#ff4d4f',
    text: '#FFF',
  },
  token: {
    colorPrimary: '#b6a764',
    text: '#FFF',
    // colorText: '#FFF',
  },
  components: {
    Layout: {
      bodyBg: 'url("/images/grunge-scratched-cracked-texture-background_dark.jpg")',
    },
    Menu: {
      darkItemSelectedBg: '#666',
    },
    Form: {
      labelColor: '#FFF'
    },
    Result: {
      colorTextDescription: '#FFF',
      colorTextHeading: '#FFF',
    },
    Tabs: {
      itemColor: '#FFF'
    },
    Button: {
      colorTextDisabled: '#666'
    },
    Breadcrumb: {
      linkColor: '#FFF',
      linkHoverColor: '#CCC',
      itemColor: '#FFF',
      separatorColor: '#FFF',
      lastItemColor: '#CCC',
    },
    Timeline: {
      colorText: '#FFF',
      dotBg: '#FFFFFF00',
      tailColor: '#FFFFFF55'
    }
  }
};