async function http(method, url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export { http };
