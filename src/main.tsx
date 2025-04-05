import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ClerkProvider } from "@clerk/clerk-react";

import "./index.css";
import App from "./App.tsx";
import { ToasterProvider } from "./provider/toast-provider.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Check for environment variables and provide fallbacks for development
if (!PUBLISHABLE_KEY) {
  console.warn("Warning: Missing Clerk Publishable Key. Using development mode with mock authentication.");
}

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a div with id 'root' in your HTML.");
}

// Check if we have a valid publishable key
const hasValidKey = PUBLISHABLE_KEY && PUBLISHABLE_KEY !== 'pk_test_mock_clerk_key_12345';

// Log the environment and key status (for debugging)
console.info(`Running in ${isDevelopment ? 'development' : 'production'} mode`);
console.info(`Clerk key status: ${hasValidKey ? 'Valid key present' : 'Using mock authentication'}`);

// Decide whether to use Clerk or mock authentication
if (!hasValidKey) {
  console.info("Running without Clerk authentication - using mock auth");

  createRoot(rootElement).render(
    <StrictMode>
      <App />
      <ToasterProvider />
    </StrictMode>
  );
} else {
  // With a valid key, use Clerk authentication
  console.info("Using Clerk authentication");
  createRoot(rootElement).render(
    <StrictMode>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
      >
        <App />
        <ToasterProvider />
      </ClerkProvider>
    </StrictMode>
  );
}
