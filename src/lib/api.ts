import { authClient } from "./auth-client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const { data } = await authClient.token();
  const headers = new Headers(options.headers);

  if (data?.token) {
    headers.set("Authorization", `Bearer ${data.token}`);
  }
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${baseUrl}${path}`, { ...options, headers });
  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }
  return result;
}
export async function publicFetch(path: string) {
  const res = await fetch(`${baseUrl}${path}`);
  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }
  return result;
}