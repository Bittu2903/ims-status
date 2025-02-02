import axios from "axios";
import {
  getCookie,
  setCookie,
  getToken,
  isAuthenticated,
} from "./authHelpers.js";

import { config } from "../config";

export function authorizationHeader() {
  const tokenCookie = getCookie("ims_auth_token");
  let token = "";

  if (tokenCookie) {
    try {
      token = tokenCookie;
    } catch (e) {
      token = ""; // Clear token if cookie parsing fails
    }
  }

  if (!token) {
    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get("token");

    if (token) {
      setCookie("ims_auth_token", { token });
    } else if (isAuthenticated()) {
      token = getToken().token;
    } else {
      return {};
    }
  }

  return {
    Authorization: "Bearer " + token,
    referrer: window.location.href,
  };
}

function handleError(onFailure, error) {
  console.error("Error occurred:", error);
  if (onFailure) {
    onFailure(error); // Call the onFailure callback if provided
  }
}

export function sanitizeUrl(url) {
  let sanitized_url = url.replace(/([^:]\/)\/+/g, "$1");

  if (!sanitized_url.endsWith("/")) {
    sanitized_url += "/";
  }

  return sanitized_url;
}

export function postCall({
  url = config.url.BASE,
  path = "",
  data = {},
  onSuccess = () => {},
  onFailure = () => {},
  isOpen = false,
}) {
  const reqConfig = {};
  if (!isOpen) {
    reqConfig.headers = {
      Authorization: "Bearer " + getCookie("ims_auth_token"),
    };
  }

  return axios
    .post(sanitizeUrl(url + path), data, reqConfig)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      handleError(onFailure, error);
    });
}

export function getCall({
  url = config.url.BASE,
  path = "",
  onSuccess = () => {},
  onFailure = () => {},
}) {
  const reqConfig = {
    headers: {
      Authorization: "Bearer " + getCookie("ims_auth_token"),
    },
  };

  return axios
    .get(sanitizeUrl(url + path), reqConfig)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      handleError(onFailure, error);
    });
}

export function deleteCall({
  url = config.url.BASE,
  path = "",
  onSuccess = () => {},
  onFailure = () => {},
}) {
  var reqConfig = {};
  reqConfig.headers = authorizationHeader();
  return axios
    .delete(sanitizeUrl(url + "/" + path), reqConfig)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      handleError(onFailure, error);
    });
}

export function putCall({
  url = config.url.BASE,
  path = "",
  data = {},
  onSuccess = () => {},
  onFailure = () => {},
}) {
  var reqConfig = {};
  reqConfig.headers = {
    Authorization: "Bearer " + getCookie("ims_auth_token"),
  };
  return axios
    .put(sanitizeUrl(url + "/" + path), data, reqConfig)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      handleError(onFailure, error.response.data.error);
    });
}

export function patchCall({
  url = config.url.BASE,
  path = "",
  data = {},
  onSuccess = () => {},
  onFailure = () => {},
}) {
  var reqConfig = {};
  reqConfig.headers = authorizationHeader();
  return axios
    .patch(sanitizeUrl(url + "/" + path), data, reqConfig)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      handleError(onFailure, error);
    });
}
