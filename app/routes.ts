import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("careers", "components/Careers/careers.tsx")
] satisfies RouteConfig;
