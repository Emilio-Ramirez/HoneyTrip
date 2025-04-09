import { LoginForm } from "~/components/login-form";
import type { Route } from "./+types/login";
import auth from "~/controllers/auth/auth";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useActionData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Sweet adventures start with planning" },
    { name: "theme-color", content: "#423839" },
  ];
}

export async function action({ request, context }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    return await auth.createSession(formData, context);
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
}

export default function Login() {
  const actionData = useActionData();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {actionData && !actionData.success && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
          <Alert variant="destructive" className="shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {actionData.message || "An error occurred during login."}
            </AlertDescription>
          </Alert>
        </div>
      )}
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-foreground text-primary-foreground">
            🍯
          </div>
          Honey Trip
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
