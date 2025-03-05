import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/landing-navbar.tsx", [
    index("routes/landing.tsx"),
    route("login", "routes/login.tsx"),
  ]),
] satisfies RouteConfig;
