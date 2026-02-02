// "use client"
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://foodhub-backend-mu.vercel.app";
};

export const authClient = createAuthClient({
  //baseURL: getBaseURL(),
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  }
});