import jwt_decode from "jwt-decode";

async function http(method, url = "", data = {}) {
  const auth = localStorage.getItem("auth");

  // Default options are marked with *
  const initialProps = {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-auth": auth || "none",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  if (method == "POST" || method == "PUT") {
    initialProps["body"] = JSON.stringify(data);
  }
  const response = await fetch(url, initialProps);

  return response.json(); // parses JSON response into native JavaScript objects
}
async function httpForm(url = "", data = {}) {
  const auth = localStorage.getItem("auth");
  // Default options are marked with *
  const initialProps = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data,
    headers: {
      "x-auth": auth || "none",
    },
  };
  const response = await fetch(url, initialProps);

  return response.json(); // parses JSON response into native JavaScript objects
}

export { http, httpForm };
