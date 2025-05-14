import { useCalendarContext } from "../../calendar-context";
import { isSameDay } from "date-fns";
import { hours } from "@/lib/utils";
import CalendarBodyHeader from "../calendar-body-header";
import CalendarEvent from "../../calendar-event";

export default function CalendarBodyDayContent({ date }: { date: Date }) {
  const { events } = useCalendarContext();

  const dayEvents = events.filter((event) => isSameDay(event.start, date));

  return (
    <div className="flex flex-grow flex-col">
      <CalendarBodyHeader date={date} />

      <div className="relative flex-1">
        {hours.map((hour) => (
          <div key={hour} className="border-border/50 group h-32 border-b" />
        ))}

        {dayEvents.map((event) => (
          <CalendarEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
