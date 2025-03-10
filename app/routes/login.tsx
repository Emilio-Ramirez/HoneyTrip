import * as schema from "~/database/schema";
//import { LoginForm } from "~/components/login-form";
import { Form } from "react-router";
import type { Route } from "./+types/landing";
import { useActionData, redirect } from "react-router";

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
     await context.db.insert(schema.users).values({
      email,
      password,
    });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    return {
      Error: "There was an error creating your account. Please try again.",
    };
  }
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="p-30">
      <h1>hola</h1>
      <Form method="post">
        <input type="text" name="email" className="bg-muted" />
        <input type="text" name="password" className="bg-secondary" />
        <button type="submit">Submit</button>
      </Form>
      {actionData ? (
        <div>
          <p>Action Result: {JSON.stringify(actionData)}</p>
          <p>Success: {actionData.success }</p>
          <p>Message: {actionData.message}</p>
        </div>
      ) : null}
    </div>
  );
}
{
  /*
   *
   *    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
   *      <div className="flex w-full max-w-sm flex-col gap-6">
   *        <a href="#" className="flex items-center gap-2 self-center font-medium">
   *          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-foreground text-primary-foreground">
   *            🍯
   *          </div>
   *          Honey Trip
   *        </a>
   *        <LoginForm />
   *      </div>
   *    </div>
   */
}
