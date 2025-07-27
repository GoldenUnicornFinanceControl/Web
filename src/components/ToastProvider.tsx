import { ReactNode, useState } from 'react';
import Icon from '@components/Icons';
import '../ErrorToast.css';

interface Toast {
  id: number;
  message: string;
  details?: string;
}

let addToastImpl: (message: string, details?: string) => void;

export function showToast(message: string, details?: string) {
  addToastImpl?.(message, details);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  addToastImpl = (message: string, details?: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, details }]);
  };

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="error-toast">
      <div className="toast-header">
        <span className="toast-message">{toast.message}</span>
        <div className="toast-buttons">
          {toast.details && (
            <button className="toast-details" onClick={() => setShow((s) => !s)}>
              <Icon icon={Icon.all.faInfoCircle} />
            </button>
          )}
          <button className="toast-dismiss" onClick={() => onDismiss(toast.id)}>
            <Icon icon={Icon.all.faClose} />
          </button>
        </div>
      </div>
      {show && toast.details && <pre className="toast-stack">{toast.details}</pre>}
    </div>
  );
}
