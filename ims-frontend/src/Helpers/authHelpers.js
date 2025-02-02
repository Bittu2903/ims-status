import { createReduxModule } from "hooks-for-redux";
import { postCall } from "./api";
import { config } from "../config";

export const [token, { setAuthenticated, setkeycloak, setAuthUser, setToken, resetToken }, tokenStore] = createReduxModule(
  "token",
  {
    keycloak: null,
    isAuthenticated: false,
    user: null,
    token: {
      token: "",
      refresh_token: "",
      expire_at: 0
    }
  },
  {
    resetToken: (token) => {
      token.token = { token: "", refresh_token: "", expire_at: 0 };
      return token;
    },
    setToken: (token, token_object) => {
      token.token = token_object;
      return token;
    },
    setAuthenticated: (token, auth_state) => {
      token.isAuthenticated = auth_state;
      return token;
    },
    setkeycloak: (token, keycloak) => {
      token.keycloak = keycloak;
      return token;
    },
    setAuthUser: (token, user) => {
      token.user = user;
      return token;
    }
  }
);

export function setCookie(cname, cvalue, exhours) {
  try {
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + '=' + JSON.stringify(cvalue) + ';' + expires + ';path=/;SameSite=None;Secure';
  } catch (err) {
    console.error("Error setting cookie:", err);
  }
}

export function getCookie(cname) {
  try {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
  } catch (err) {
    console.error("Error getting cookie:", err);
  }
  return "";
}

export function hasCookie(cookie_name) {
  return getCookie(cookie_name) !== "";
}

export function getToken() {
  const tokenData = tokenStore.getState()["token"];
  const currentTime = Date.now();

  if (tokenData.expire_at - currentTime < 5 * 60 * 1000) {
    refreshAccessToken();
  }

  return tokenData;
}

export function isAuthenticated() {
  const token = getCookie('ims_auth_token');
  if (!token) {
    refreshAccessToken();
    return false;
  }
  return true;
}

export async function refreshAccessToken() {
  const tokenData = getCookie("ims_refresh_token");
  if (!tokenData || !tokenData.refresh_token) {
    console.error("No refresh token available.");
    return;
  }

  try {
    await postCall({
      path: config.url.BASE + '/api/token/refresh/',
      data: {
        refresh: tokenData.refresh_token
      },
      isOpen: true,
      onSuccess: (response) => {
        const newTokenData = {
          token: response.data.access,
          refresh_token: response.data.refresh,
          expire_at: Date.now() + (response.data.expires_in * 1000)
        };

        setCookie("ims_auth_token", newTokenData, 1);
        setToken(newTokenData);
      },
      onFailure: (error) => {
        console.error("Refresh token failed:", error);
      },
    });
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
}
