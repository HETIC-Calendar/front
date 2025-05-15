import type { CalendarEvent } from "@/components/calendar/calendar-types";
import type { Talk } from "@/lib/types";
import { getEventColor } from "./utils";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchApi = async (route: string) => {
  const response = await fetch(`${apiUrl}/${route}`);
  const data = await response.json();
  return data;
};

export const fetchRooms = async () => {
  const result = await fetchApi("rooms");
  return result.rooms;
};

export const fetchTalks = async () => {
  const result = await fetchApi("talks");
  const formattedEvents: CalendarEvent[] = [];
  result.talks.forEach((talk: Talk) => {
    formattedEvents.push({
      id: talk.id,
      title: talk.title,
      status: talk.status,
      room: talk.roomId,
      color: getEventColor(talk.status),
      start: new Date(talk.startTime),
      end: new Date(talk.endTime)
    });
  });
  return formattedEvents;
};
