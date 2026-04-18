import { useEffect, useState } from "react";
import keycloak from "../keycloak";

let initialized = false; // 👈 global guard

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (initialized) return; // 👈 prevents double init
    initialized = true;

    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
      })
      .then(() => {
        setUser({
            username: keycloak.tokenParsed?.preferred_username,
            email: keycloak.tokenParsed?.email,
            roles: keycloak.tokenParsed?.realm_access?.roles || [],
});
      })
      .catch((err) => {
        console.error("KC INIT ERROR:", err);
      });
  }, []);

  if (!user) {
    return <div className="text-center mt-20">Authenticating...</div>;
  }

  return children(user);
}