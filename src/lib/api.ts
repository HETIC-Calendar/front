import type { CalendarEvent } from "@/components/calendar/calendar-types";
import type { Event } from "@/lib/types";

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

export const fetchEvents = async () => {
  const result = await fetchApi("talks");
  const formattedEvents: CalendarEvent[] = [];
  result.talks.forEach((event: Event) => {
    formattedEvents.push({
      id: event.id,
      title: event.title,
      room: event.roomId,
      color: "blue",
      start: new Date(event.startTime),
      end: new Date(event.endTime)
    });
  });
  return formattedEvents;
};
