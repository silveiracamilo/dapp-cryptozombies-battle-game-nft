import { ConfigProvider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackErrorBoundary from 'utils/error/FallbackErrorBoundary';
import AuthContextProvider from './context/auth/AuthContextProvider';
import Router from './router/Router'
import { Provider } from 'react-redux';
import store from './store/store';
import { GlobalStyle, themeStyle } from './globalStyles';

function App() {
  console.log(import.meta.env.VITE_API_BASE_URL)

  return (
    <ConfigProvider theme={{ hashed: false, ...themeStyle }}>
      <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
        <Provider store={store}>
          <AuthContextProvider>
            <Router />
            <GlobalStyle />
          </AuthContextProvider>
        </Provider>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App
