import { showToast } from './components/ToastProvider';

export function showErrorToast(message: string, details?: string) {
  showToast(message, details);
}

export function initializeGlobalErrorHandling() {
  window.onerror = function (message, source, line, column, error) {
    const msg = error?.message || (typeof message === 'string' ? message : 'Unknown error');
    const stack = error instanceof Error ? error.stack : undefined;
    showErrorToast(msg, stack);
    return false;
  };

  window.onunhandledrejection = function (event) {
    const reason = event.reason;
    const msg = reason instanceof Error ? reason.message : String(reason);
    const stack = reason instanceof Error ? reason.stack : undefined;
    showErrorToast(msg, stack);
  };
}
