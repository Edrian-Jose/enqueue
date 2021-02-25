import path from "path";
import getConfig from "next/config";
const dev = process.env.NODE_ENV !== "production";

export const serverPath = (staticFilePath) => {
  return path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    staticFilePath
  );
};

export const server = dev
  ? "http://localhost:3000"
  : "https://enqueue.vercel.app";

export const publicFolder = dev ? "./public/" : serverPath;
