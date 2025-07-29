import { showToast } from './components/ToastProvider';

export function showErrorToast(message: string) {
  showToast(message);
}

export function initializeGlobalErrorHandling() {
  window.onerror = function (message, source, line, column, error) {
    const msg = error?.message || (typeof message === 'string' ? message : 'Unknown error');
    showErrorToast(msg);
    return false;
  };

  window.onunhandledrejection = function (event) {
    const reason = event.reason;
    const msg = reason instanceof Error ? reason.message : String(reason);
    showErrorToast(msg);
  };
}
