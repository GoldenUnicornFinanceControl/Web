import './index.css';
import ReactDOM from 'react-dom/client';

import './global';
import './data/firebase/google-services';
import { VarsProvider } from '@components/Vars';
import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import ToastProvider from './components/ToastProvider';
import { initializeGlobalErrorHandling } from './errorHandling';

initializeGlobalErrorHandling();


ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <VarsProvider>
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ErrorBoundary>
  </VarsProvider>
);
