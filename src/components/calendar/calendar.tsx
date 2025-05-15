import type { CalendarProps } from "@/components/calendar/calendar-types";
import CalendarHeader from "@/components/calendar/header/calendar-header";
import CalendarBody from "@/components/calendar/body/calendar-body";
import CalendarHeaderActions from "@/components/calendar/header/actions/calendar-header-actions";
import CalendarHeaderDate from "@/components/calendar/header/date/calendar-header-date";
import CalendarHeaderActionsMode from "@/components/calendar/header/actions/calendar-header-actions-mode";
import CalendarHeaderActionsAdd from "@/components/calendar/header/actions/calendar-header-actions-add";
import CalendarHeaderActionsLogout from "@/components/calendar/header/actions/calendar-header-actions-logout";
import CalendarHeaderActionsLogin from "@/components/calendar/header/actions/calendar-header-actions-login";
import CalendarProvider from "@/components/calendar/calendar-provider";
import { useStore } from "@/store/store";
import CalendarHeaderActionsFilters from "./header/actions/calendar-header-actions-filters";

export default function Calendar({
  events,
  setEvents,
  mode,
  setMode,
  date,
  setDate,
  calendarIconIsToday = true,
  filters,
  setFilters
}: CalendarProps) {
  const { user, hasRole } = useStore();

  return (
    <CalendarProvider
      events={events}
      setEvents={setEvents}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
      calendarIconIsToday={calendarIconIsToday}
      filters={filters}
      setFilters={setFilters}
    >
      <CalendarHeader>
        <CalendarHeaderDate />
        <CalendarHeaderActions>
          <CalendarHeaderActionsFilters />
          <CalendarHeaderActionsMode />
          {hasRole("SPEAKER") && <CalendarHeaderActionsAdd />}
          {user ? <CalendarHeaderActionsLogout /> : <CalendarHeaderActionsLogin />}
        </CalendarHeaderActions>
      </CalendarHeader>
      <CalendarBody />
    </CalendarProvider>
  );
}
