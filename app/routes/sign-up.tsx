import { SignUpForm } from "~/components/singup-form";
import type { Route } from "./+types/landing";
import { createUser } from "~/controllers/AuthController";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up" },
    { name: "description", content: "Sweet adventures start with planning" },
    { name: "theme-color", content: "#423839" },
  ];
}

export async function action({ request, context }: Route.ActionArgs) {
  let formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string"
  ) {
    return { success: false, message: "Invalid form data" };
  }

  name = name.trim();
  email = email.trim();
  password = password.trim();
  try {
    let userName = await createUser(context, email, password, name);

    console.log("User created:", userName);
    // TODO: Use a modal to show a success message
    return redirect("/");
  } catch (error) {
    return {
      // TODO: Use a modal to show an error message
      Error: "There was an error creating your account. Please try again.",
    };
  }
}

export default function SignUp({ actionData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-foreground text-primary-foreground">
            🍯
          </div>
          Honey Trip
        </a>
        <SignUpForm />
      </div>
    </div>
  );
}
