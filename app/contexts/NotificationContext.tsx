import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Notification } from "~/components/Notification";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationData {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  notifications: NotificationData[]; // Fixed typo from "norifications"
  showNotification: (notification: Omit<NotificationData, "id">) => void;
  hideNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = useCallback(
    ({
      type,
      title,
      message,
      duration = 3000, // Increase default duration to 3 seconds
    }: Omit<NotificationData, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newNotification = { id, type, title, message, duration };

      setNotifications((prev) => [...prev, newNotification]);

      if (duration > 0) {
        setTimeout(() => hideNotification(id), duration);
      }
    },
    []
  );

  // Moved inside the component function
  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Added the missing return statement
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        hideNotification,
      }}
    >
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col max-h-screen overflow-y-auto w-full max-w-md pointer-events-none">
        {notifications.map((notification) => (
          <div key={notification.id} className="mb-3 pointer-events-auto">
            <Notification
              type={notification.type}
              title={notification.title}
              message={notification.message}
              onClose={() => hideNotification(notification.id)}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
