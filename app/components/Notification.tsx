import {
  AlertCircle,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Info,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  type: NotificationType;
  title?: string;
  message: string;
  onClose?: () => void;
}

export function Notification({
  type,
  title,
  message,
  onClose,
}: NotificationProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
    }
  };
  const getVariant = () => {
    return type === "error" ? "destructive" : "default";
  };

  const getClassName = () => {
    switch (type) {
      case "success":
        return "border-green-500 bg-green-50 text-green-900";
      case "error":
        return ""; // Uses destructive variant
      case "warning":
        return "border-orange-500 bg-orange-50 text-orange-900";
      case "info":
        return "border-blue-500 bg-blue-50 text-blue-900";
    }
  };

  return (
    <Alert variant={getVariant()} className={getClassName()}>
      {getIcon()}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2"
          aria-label="Close notification"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
}
