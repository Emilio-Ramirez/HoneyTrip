import { SignUpForm } from "~/components/singup-form";
import type { Route } from "./+types/landing";
import auth from "~/controllers/auth/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up" },
    { name: "description", content: "Sweet adventures start with planning" },
    { name: "theme-color", content: "#423839" },
  ];
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  return auth.createUser(formData, context);
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
