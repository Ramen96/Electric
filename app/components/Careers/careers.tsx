import React from "react";
import type { LoaderFunction } from "@react-router/dev";
import ApplicationForm from "../ApplicationForm/applicationForm";

// Loader
export const loader: LoaderFunction = async () => {
  return null;
};

// Component
export default function Careers() {
  return (
    <ApplicationForm />
  );
}

// SEO
export function meta() {
  return [
    { title: "Careers | C&C Electric" },
    { name: "description", content: "Explore career opportunities at C&C Electric." },
  ];
}