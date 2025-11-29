import React, { createContext, useContext, useState, useCallback } from "react";
import ReactDOM from "react-dom";

const ToastContext = createContext();

/**
 * @function useToast
 * @description Hook to trigger toast notifications from any component.
 */
export const useToast = () => {
  return useContext(ToastContext);
};

/**
 * @function ToastNotification
 * @description The UI component for the notification.
 */
const ToastNotification = ({ message, type, onClose }) => {
  const bgColor =
    type === "success" ? "var(--success-color)" : "var(--danger-color)";

  return ReactDOM.createPortal(
    <div className="toast-notification" style={{ backgroundColor: bgColor }}>
      <span>{message}</span>
      <button onClick={onClose}>&times;</button>
    </div>,
    document.body // Portal the notification to the body for z-index safety
  );
};

/**
 * @function ToastProvider
 * @description Provides the context and manages the state of notifications.
 */
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  /**
   * @function showToast
   * @description Function to call to display a toast message.
   * @param {string} message - The message to display.
   * @param {string} type - 'success' or 'error'.
   */
  const showToast = useCallback(
    (message, type = "success", duration = 3000) => {
      setToast({ message, type });

      setTimeout(() => {
        setToast(null);
      }, duration);
    },
    []
  );

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};
