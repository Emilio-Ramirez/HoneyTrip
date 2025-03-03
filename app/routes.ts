import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  //route("login", "routes/login.tsx"),
] satisfies RouteConfig;
