import type { Room, Talk } from "@/lib/types";

const apiUrl = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  body: unknown,
  options: Omit<RequestInit, "body"> = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as T;
}

export async function apiGet<T>(
  endpoint: string,
  body?: unknown,
  options: RequestInit = {}
): Promise<T> {
  return apiFetch<T>(endpoint, body, { ...options, method: "GET" });
}

export async function apiPost<T>(
  endpoint: string,
  body: unknown,
  options: RequestInit = {}
): Promise<T> {
  return apiFetch<T>(endpoint, body, { ...options, method: "POST" });
}

export async function apiPut<T>(
  endpoint: string,
  body: unknown,
  options: RequestInit = {}
): Promise<T> {
  return apiFetch<T>(endpoint, body, { ...options, method: "PUT" });
}

export async function apiPatch<T>(
  endpoint: string,
  body: unknown,
  options: RequestInit = {}
): Promise<T> {
  return apiFetch<T>(endpoint, body, { ...options, method: "PATCH" });
}

export async function apiDelete<T>(
  endpoint: string,
  body: unknown,
  options: RequestInit = {}
): Promise<T> {
  return apiFetch<T>(endpoint, body, { ...options, method: "DELETE" });
}

export const fetchRooms = async () => {
  const result = await apiGet<{ rooms: Room[] }>("/rooms");
  return result.rooms;
};

export const fetchTalks = async () => {
  const result = await apiGet<{ talks: Talk[] }>("/talks");
  return result.talks;
};

export const createTalk = async (talk: Omit<Talk, "id" | "createdAt" | "updatedAt">) => {
  await apiPost<{ talk: Talk }>("/talks", talk);
};
