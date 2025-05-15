import { apiPost } from "@/lib/api";

export async function login(email: string, password: string) {
  const response = await apiPost<{ token: string }>("/auth/login", { email, password });
  return response.token;
}

export async function register(email: string, password: string) {
  const response = await apiPost("/auth/register", { email, password });
  return response;
}
