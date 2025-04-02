import type { Route } from "./+types/home";
import { LandingPage } from "~/components/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "C&C Electric" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
