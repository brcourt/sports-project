import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from "aws-amplify";

const userPoolId = import.meta.env.PUBLIC_USER_POOL_ID;
const userPoolClientId = import.meta.env.PUBLIC_USER_POOL_CLIENT_ID;
const identityPoolId = import.meta.env.PUBLIC_IDENTITY_POOL_ID;

if (!userPoolId || !identityPoolId || !userPoolClientId) {
  throw new Error("environment variables is not set!");
}

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
      identityPoolId,
      allowGuestAccess: true,
      signUpVerificationMethod: "code", // 'code' | 'link'
      loginWith: {
        oauth: {
          domain: "auth.sports.courtney.cloud",
          scopes: ["email", "openid", "phone", "aws.cognito.signin.user.admin"],
          redirectSignIn: [
            "https://sports.courtney.cloud",
            "http://localhost:3000",
          ],
          redirectSignOut: [
            "https://sports.courtney.cloud/login",
            "http://localhost:3000/login",
          ],
          responseType: "code",
        },
      },
    },
  },
});

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
