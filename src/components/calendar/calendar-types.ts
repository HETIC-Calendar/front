import type { Talk, TalkSubject, TalkLevel } from "@/lib/types";

export type CalendarProps = {
  events: Talk[];
  setEvents: (events: Talk[]) => void;
  filters: { selectedSubject: TalkSubject | null; selectedLevel: TalkLevel | null };
  setFilters: (filters: {
    selectedSubject: TalkSubject | null;
    selectedLevel: TalkLevel | null;
  }) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  date: Date;
  setDate: (date: Date) => void;
  calendarIconIsToday?: boolean;
};

export type CalendarContextType = CalendarProps & {
  newEventDialogOpen: boolean;
  setNewEventDialogOpen: (open: boolean) => void;
  manageEventDialogOpen: boolean;
  setManageEventDialogOpen: (open: boolean) => void;
  selectedEvent: Talk | null;
  setSelectedEvent: (event: Talk | null) => void;
};

export const calendarModes = ["day", "week", "month"] as const;
export type Mode = (typeof calendarModes)[number];
