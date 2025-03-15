import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

export default [
  // Protected routes with auth check and sidebar
  layout("layouts/protected-layout.tsx", [
    index("routes/protected/dashboard.tsx"),
    route("Trips", "routes/protected/trips.tsx"),
  ]),

  // Public routes
  layout("layouts/landing-navbar.tsx", [
    route("Home", "routes/landing.tsx"),
    route("Sign-up", "routes/sign-up.tsx"),
    route("Login", "routes/login.tsx"),
  ]),
] satisfies RouteConfig;
