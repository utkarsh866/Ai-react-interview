import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ClerkProvider } from "@clerk/clerk-react";

import "./index.css";
import App from "./App.tsx";
import { ToasterProvider } from "./provider/toast-provider.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check for environment variables and provide fallbacks for development
if (!PUBLISHABLE_KEY) {
  console.warn("Warning: Missing Clerk Publishable Key. Authentication features will not work properly.");
}

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a div with id 'root' in your HTML.");
}

createRoot(rootElement).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY || 'pk_test_dummy_key_for_development'}
      afterSignOutUrl="/"
    >
      <App />
      <ToasterProvider />
    </ClerkProvider>
  </StrictMode>
);
