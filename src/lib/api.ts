import type { Room, Talk, TalkStatus } from "@/lib/types";

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

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return {} as T;
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
  body?: unknown,
  options: RequestInit = {}
): Promise<T> {
  return apiFetch<T>(endpoint, body, { ...options, method: "DELETE" });
}

export const fetchRooms = async () => {
  const result = await apiGet<{ rooms: Room[] }>("/rooms");
  return result.rooms;
};

export const fetchTalks = async (status?: TalkStatus) => {
  const result = await apiGet<{ talks: Talk[] }>(`/talks${status ? `?status=${status}` : ""}`);
  return result.talks;
};

export const createTalk = async (
  talk: Omit<Talk, "id" | "status" | "speaker" | "room" | "createdAt" | "updatedAt"> & {
    roomId: string;
  }
) => {
  await apiPost<{ talk: Talk }>("/talks", talk);
};

export const editTalk = async (
  talkId: string,
  talk: Omit<Talk, "id" | "status" | "speaker" | "room" | "createdAt" | "updatedAt"> & {
    roomId: string;
  }
) => {
  await apiPost<{ talk: Talk }>(`/talks/${talkId}`, talk);
};

export const deleteTalk = async (talkId: string) => {
  await apiDelete(`/talks/${talkId}`);
};

export const rejectTalk = async (talkId: string) => {
  await apiPost(`/talks/${talkId}/approve-or-reject`, { isApproved: false });
};

export const approveTalk = async (talkId: string) => {
  await apiPost(`/talks/${talkId}/approve-or-reject`, { isApproved: true });
};
