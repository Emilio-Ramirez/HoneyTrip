// app/layouts/protected-layout.tsx
import { Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import auth from "../controllers/auth/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  // Pass request to getUser
  const user = await auth.getUser(request);

  if (!user) {
    return redirect("/login");
  }

  return { user };
}

export default function ProtectedLayout() {
  // You can access user data with useLoaderData if needed
  return <Outlet />;
}
