import { redirect } from "react-router";
import type { Route } from "./+types/dashboard";

export async function loader({ context }: Route.LoaderArgs) {
  console.log("Dasbhoard Loader");

  return { authenticated: true };
}

export default function dashboard() {
  return (
    <div className="bg-primary">
      <h1>Dashboard</h1>
      <p>This is a protected route</p>
    </div>
  );
}
