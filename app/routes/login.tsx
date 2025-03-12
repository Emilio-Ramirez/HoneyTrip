import { LoginForm } from "~/components/login-form";
import type { Route } from "./+types/login";
import { login } from "~/controllers/AuthController";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Sweet adventures start with planning" },
    { name: "theme-color", content: "#423839" },
  ];
}

export async function action({ request, context }: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { success: false, message: "Invalid form data" };
  }

  email = email.trim();
  password = password.trim();

  try {
    let result = await login(context, email, password);
    console.log("User logged in:", result);
    return { success: true, message: "User logged in" };
  } catch (error) {
    console.error("Failed to login:", error);
    return { success: false, message: "Failed to login" };
  }
}

export default function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
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
