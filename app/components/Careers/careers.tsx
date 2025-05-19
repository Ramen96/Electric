import React from "react";
import type { LoaderFunction } from "@react-router/dev";
// Loader
export const loader: LoaderFunction = async () => {
  return null;
};

// Component
export default function Careers() {
  return (
    <div>
      <h1>Careers</h1>
      <p>Welcome to the Careers page at C&C Electric!</p>
    </div>
  );
}

// SEO
export function meta() {
  return [
    { title: "Careers | C&C Electric" },
    { name: "description", content: "Explore career opportunities at C&C Electric." },
  ];
}