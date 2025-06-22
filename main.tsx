import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Local imports
import App from "./App.tsx";

// Styles
import "./index.css";

// Define your Google OAuth client ID here
const clientId = "133426663689-2i05ddo0v7kcqikp29cgka2h1ob25cc8.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);


