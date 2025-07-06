import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import 'leaflet/dist/leaflet.css';
import { generateServiceSchema } from "./utils/serviceSchema.js"; // Adjust path if needed

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function meta() {
  const phoneNumber = "(704) 879-4057";
  const streetAddress = "510 West 1st Street";
  const addressLocality = "Lowell";
  const addressRegion = "NC";
  const postalCode = "28098";
  const country = "US";
  const businessName = "C&C Electrical LLC";
  const websiteUrl = "https://cncelectricco.com/";
  const logoFilename = "cncelectricco-logo.png";
  const logoUrl = `${websiteUrl}images/${logoFilename}`;
  const ogImageFilename = "og-image.png";
  const ogImageUrl = `${websiteUrl}images/${ogImageFilename}`;

  // Corrected Google Maps URL
  const encodedAddress = encodeURIComponent(`${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`);
  const googleMapsUrl = `http://maps.google.com/maps?q=${encodedAddress}`; // Standard Google Maps query URL

  // Define your services data here (or import it from a shared source if preferred)
  const servicesData = [
    {
      title: "Residential Electrical",
      description: "Complete electrical services for homes including wiring, panel upgrades, and smart home installations.",
      detailedInfo: {
        services: [
          "Complete home rewiring and electrical upgrades",
          "Electrical panel installations and upgrades",
          "Smart home automation systems",
          "GFCI outlet installation and safety inspections",
          "Ceiling fan and lighting fixture installation",
          "Electrical troubleshooting and repairs",
          "Code compliance and safety inspections"
        ]
      }
    },
    {
      title: "Commercial Electrical",
      description: "Professional electrical solutions for businesses, offices, and commercial properties.",
      detailedInfo: {
        services: [
          "Office building electrical systems",
          "Retail store lighting and power systems",
          "Emergency lighting and exit signs",
          "Commercial panel and switchgear installation",
          "Data center electrical infrastructure",
          "Security system electrical work",
          "Energy-efficient lighting retrofits"
        ]
      }
    },
    {
      title: "Industrial Electrical",
      description: "Heavy-duty electrical systems for manufacturing, warehouses, and industrial facilities.",
      detailedInfo: {
        services: [
          "High-voltage electrical systems",
          "Motor control and automation",
          "Industrial panel fabrication",
          "Conveyor system electrical work",
          "Process control wiring",
          "Emergency power systems",
          "Electrical maintenance programs"
        ]
      }
    },
    {
      title: "EV Installations",
      description: "Electric vehicle charging station installation for homes and businesses.",
      detailedInfo: {
        services: [
          "Residential EV charger installation",
          "Commercial charging station setup",
          "Level 2 and DC fast charging options",
          "Electrical panel upgrades for EV charging",
          "Smart charging system integration",
          "Fleet charging solutions",
          "Permit and inspection coordination"
        ]
      }
    },
    {
      title: "Solar Panel Installation",
      description: "Complete solar energy systems from design to installation and maintenance.",
      detailedInfo: {
        services: [
          "Custom solar system design",
          "Residential and commercial installations",
          "Battery backup system integration",
          "Grid-tie and off-grid solutions",
          "Solar panel maintenance and cleaning",
          "System monitoring and optimization",
          "Permit and utility interconnection"
        ]
      }
    }
  ];

  // Generate Service schemas for each service
  const serviceSchemas = servicesData.map(service => ({
    tagName: "script",
    type: "application/ld+json",
    innerHTML: JSON.stringify(generateServiceSchema(service, businessName, websiteUrl, logoUrl, phoneNumber))
  }));


  return [
    { title: `${businessName} - Professional Electrical Services | North Carolina` },
    { name: "description", content: "C&C Electrical LLC provides expert residential, commercial, and industrial electrical services in North Carolina, including Lowell, NC. Your trusted electrical contractor for quality solutions." },
    { name: "keywords", content: "electrical services North Carolina, electrician Lowell NC, residential electrical contractor, commercial electrical solutions, industrial electrical work, C&C Electrical LLC" },
    { property: "og:title", content: `${businessName} - Professional Electrical Services` },
    { property: "og:description", content: "Expert electrical services for residential, commercial, and industrial needs across North Carolina." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: websiteUrl },
    { property: "og:image", content: ogImageUrl },

    // LOCAL BUSINESS SCHEMA
    {
      tagName: "script",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Electrician",
        "name": businessName,
        "image": logoUrl,
        "@id": websiteUrl + "#organization",
        "url": websiteUrl,
        "telephone": phoneNumber,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": addressLocality,
          "addressRegion": addressRegion,
          "postalCode": postalCode,
          "addressCountry": country
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "07:00",
            "closes": "15:00"
          }
        ],
        "serviceArea": {
          "@type": "AdministrativeArea",
          "name": "North Carolina"
        },
        "slogan": "Efficiency · Reliability · Innovation",
        "hasMap": googleMapsUrl,
        "sameAs": [
          // Add your social media profiles here. Example:
          // "https://www.facebook.com/CNCElectricalLLC",
          // "https://www.linkedin.com/company/cnc-electrical-llc"
        ]
      })
    },
    // ORGANIZATION SCHEMA
    {
      tagName: "script",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": businessName,
        "url": websiteUrl,
        "logo": logoUrl,
        "sameAs": [
          // Duplicate social media links from LocalBusiness for consistency
          // "https://www.facebook.com/CNCElectricalLLC",
          // "https://www.linkedin.com/company/cnc-electrical-llc"
        ]
      })
    },
    // WEBSITE SCHEMA
    {
      tagName: "script",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": businessName,
        "url": websiteUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${websiteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      })
    },
    // Dynamically generated Service schemas
    ...serviceSchemas
  ];
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}