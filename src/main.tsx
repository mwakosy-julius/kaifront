import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Local imports
import App from "./App.tsx";

// Styles
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add then Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);


