async function http(method, url = "", data = {}) {
  // Default options are marked with *
  const initialProps = {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
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

export { http };
