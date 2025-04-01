import { ConfigProvider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackErrorBoundary from 'utils/error/FallbackErrorBoundary';
import AuthContextProvider from './context/auth/AuthContextProvider';
import Router from './router/Router'
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <ConfigProvider theme={{ hashed: false }}>
      <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
        <Provider store={store}>
          <AuthContextProvider>
            <Router />
          </AuthContextProvider>
        </Provider>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App
