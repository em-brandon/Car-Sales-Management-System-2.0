"use client"

import * as react from "react";
import { Toast } from "./Toast";

export const ToastContext = react.createContext({
  notify: (message: string, variant?: "default" | "destructive") => {},
})

export const ToastProvider: react.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = react.useState<{ id: string; message: string; variant: "default" | "destructive" }[]>([]);

  const notify = (message: string, variant: "default" | "destructive" = "default") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        {toasts.map((t) => (
          <Toast key={t.id} variant={t.variant}>
            {t.message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};