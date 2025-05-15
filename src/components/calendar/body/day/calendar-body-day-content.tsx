import { useCalendarContext } from "@/components/calendar/calendar-context";
import { isSameDay } from "date-fns";
import { getFilteredEvents, hours } from "@/lib/utils";
import CalendarBodyHeader from "@/components/calendar/body/calendar-body-header";
import CalendarEvent from "@/components/calendar/calendar-event";

export default function CalendarBodyDayContent({ date }: { date: Date }) {
  const { events, filters } = useCalendarContext();

  const dayEvents = events.filter((event) => isSameDay(event.startTime, date));

  return (
    <div className="flex flex-grow flex-col">
      <CalendarBodyHeader date={date} />

      <div className="relative flex-1">
        {hours.map((hour) => (
          <div key={hour} className="border-border/50 group h-32 border-b" />
        ))}

        {getFilteredEvents(dayEvents, filters).map((event) => (
          <CalendarEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
