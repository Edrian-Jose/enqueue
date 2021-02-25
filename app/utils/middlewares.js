import { jwtVerify } from "./apiAuth";

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

const authToken = (req, res, fn) => {
  const auth = req.headers["x-auth"];
  if (auth && jwtVerify(auth)) {
    return fn({ result: jwtVerify(auth) });
  } else {
    return fn({ error: new Error("Auth is wrong") });
  }
};

export { runMiddleware, authToken };
