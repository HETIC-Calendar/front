import { CalendarContext } from "@/components/calendar/calendar-context";
import type { Mode } from "@/components/calendar/calendar-types";
import { useState } from "react";
import CalendarNewEventDialog from "@/components/calendar/dialog/calendar-new-event-dialog";
import CalendarManageEventDialog from "@/components/calendar/dialog/calendar-manage-event-dialog";
import type { Talk, TalkLevel, TalkSubject } from "@/lib/types";

export default function CalendarProvider({
  events,
  setEvents,
  mode,
  setMode,
  date,
  setDate,
  calendarIconIsToday = true,
  filters,
  setFilters,
  children
}: {
  events: Talk[];
  setEvents: (events: Talk[]) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  date: Date;
  setDate: (date: Date) => void;
  calendarIconIsToday: boolean;
  filters: { selectedSubject: TalkSubject | null; selectedLevel: TalkLevel | null };
  setFilters: (filters: {
    selectedSubject: TalkSubject | null;
    selectedLevel: TalkLevel | null;
  }) => void;
  children: React.ReactNode;
}) {
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
  const [manageEventDialogOpen, setManageEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Talk | null>(null);

  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        mode,
        setMode,
        date,
        setDate,
        calendarIconIsToday,
        filters,
        setFilters,
        newEventDialogOpen,
        setNewEventDialogOpen,
        manageEventDialogOpen,
        setManageEventDialogOpen,
        selectedEvent,
        setSelectedEvent
      }}
    >
      <CalendarNewEventDialog />
      <CalendarManageEventDialog />
      {children}
    </CalendarContext.Provider>
  );
}
