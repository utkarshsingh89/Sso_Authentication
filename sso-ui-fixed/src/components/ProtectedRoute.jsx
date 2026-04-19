export default function ProtectedRoute({ children, keycloak }) {
  // Wait until keycloak is ready
  if (!keycloak || !keycloak.authenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Extract user from token
  const user = {
    username: keycloak.tokenParsed?.preferred_username,
    email: keycloak.tokenParsed?.email,
    roles: keycloak.tokenParsed?.realm_access?.roles || [],
  };

  return children(user);
}