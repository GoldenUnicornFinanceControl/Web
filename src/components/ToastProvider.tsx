import { ReactNode, useState } from 'react';
import '../ErrorToast.css';

interface Toast {
  id: number;
  message: string;
}

let addToastImpl: (message: string) => void;

export function showToast(message: string) {
  addToastImpl?.(message);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  addToastImpl = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div className="error-toast" key={t.id}>
            <span style={{ flex: 1 }}>{t.message}</span>
            <button onClick={() => dismiss(t.id)}>×</button>
          </div>
        ))}
      </div>
    </>
  );
}
