import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import keycloak from "./keycloak";

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    if (!authenticated) {
      window.location.reload();
    }

    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <App keycloak={keycloak} />
      </StrictMode>
    );
  });