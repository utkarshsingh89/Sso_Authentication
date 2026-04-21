import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "sso-demo",
  clientId: "second-app", // new client
});

export default keycloak;