import { ConfigProvider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackErrorBoundary from 'utils/error/FallbackErrorBoundary';
import AuthContextProvider from './context/auth/AuthContextProvider';
import Router from './router/Router'

function App() {
  return (
    <ConfigProvider>
      <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App
