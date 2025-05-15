"use client";

import { useState, useEffect } from "react";
import Calendar from "@/components/calendar/calendar";
import type { CalendarEvent, Mode } from "@/components/calendar/calendar-types";
import { fetchTalks } from "@/lib/api";

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [mode, setMode] = useState<Mode>("month");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await fetchTalks();
      setEvents(eventsData);
    };
    loadEvents();
  }, []);

  return (
    <Calendar
      events={events}
      setEvents={setEvents}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
    />
  );
}

export default App;
