import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Talk, TalkStatus, TalkSubject, TalkLevel } from "@/lib/types";
import { fetchTalks } from "@/lib/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hours = Array.from({ length: 24 }, (_, i) => i);
export const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

export const getTalkColor = (status: TalkStatus) => {
  switch (status) {
    case "PENDING_APPROVAL":
      return "orange";
    case "APPROVED":
      return "emerald";
    case "REJECTED":
      return "red";
  }
};

export const loadEvents = async (setEvents: (events: Talk[]) => void, status?: TalkStatus) => {
  const eventsData = await fetchTalks(status);
  setEvents(eventsData);
};

export const getFilteredEvents = (
  talks: Talk[],
  filters: {
    selectedSubject: TalkSubject | null;
    selectedLevel: TalkLevel | null;
    byFavorites: boolean;
  }
) => {
  if (filters.selectedSubject === null && filters.selectedLevel === null && !filters.byFavorites) {
    return talks;
  }

  let filteredTalks = talks;

  if (filters.selectedSubject !== null) {
    filteredTalks = filteredTalks.filter((talk) => talk.subject === filters.selectedSubject);
  }

  if (filters.selectedLevel !== null) {
    filteredTalks = filteredTalks.filter((talk) => talk.level === filters.selectedLevel);
  }

  if (filters.byFavorites) {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites || favorites.length === 0) {
      return [];
    }
    filteredTalks = filteredTalks.filter((talk) => favorites.includes(talk.id));
  }

  return filteredTalks;
};
