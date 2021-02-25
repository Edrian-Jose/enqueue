const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://enqueue.vercel.app";
export const publicFolder = dev ? "./public/" : process.cwd() + "/";
