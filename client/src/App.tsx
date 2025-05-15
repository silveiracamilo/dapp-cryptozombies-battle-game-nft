import { ConfigProvider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackErrorBoundary from 'utils/error/FallbackErrorBoundary';
import AuthContextProvider from './context/auth/AuthContextProvider';
import Router from './router/Router'
import { Provider } from 'react-redux';
import store from './store/store';
import { GlobalStyle, themeStyle } from './globalStyles';
import AppContextProvider from './context/app/AppContextProvider';

function App() {
  return (
    <ConfigProvider theme={{ hashed: false, ...themeStyle }}>
      <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
        <Provider store={store}>
          <AuthContextProvider>
            <AppContextProvider>
              <GlobalStyle />
              <Router />
            </AppContextProvider>
          </AuthContextProvider>
        </Provider>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App
