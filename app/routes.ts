import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/protected-navbar.tsx", [index("routes/protected/dashboard.tsx"),route("Trips","routes/protected/trips.tsx")],),

  layout("layouts/landing-navbar.tsx", [
    route("Home","routes/landing.tsx"),
    route("Sign-up","routes/sign-up.tsx"),
    route("Login","routes/login.tsx"),
  ])

] satisfies RouteConfig;
