// app/layouts/protected-layout.tsx
import { Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import auth from "../controllers/auth/auth";
import userController from "~/controllers/UsersController";

export async function loader({ request, context }: LoaderFunctionArgs) {
  // Pass request to getUser
  const session = await auth.getUser(request);

  if (!session) {
    return redirect("/login");
  }

  const user = await userController.getUserBySession(session.$id, context);

  return { user };
}

export default function ProtectedLayout() {
  // You can access user data with useLoaderData if needed
  return <Outlet />;
}
