import { useCalendarContext } from "@/components/calendar/calendar-context";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  isWithinInterval
} from "date-fns";
import { cn } from "@/lib/utils";
import CalendarEvent from "@/components/calendar/calendar-event";

export default function CalendarBodyMonth() {
  const { date, events, setDate, setMode } = useCalendarContext();

  // Get the first day of the month
  const monthStart = startOfMonth(date);
  // Get the last day of the month
  const monthEnd = endOfMonth(date);

  // Get the first Monday of the first week (may be in previous month)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  // Get the last Sunday of the last week (may be in next month)
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  // Get all days between start and end
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const today = new Date();

  // Filter events to only show those within the current month view
  const visibleEvents = events.filter(
    (event) =>
      isWithinInterval(event.start, {
        start: calendarStart,
        end: calendarEnd
      }) || isWithinInterval(event.end, { start: calendarStart, end: calendarEnd })
  );

  return (
    <div className="flex flex-grow flex-col overflow-hidden">
      <div className="border-border divide-border hidden grid-cols-7 divide-x md:grid">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <div
            key={day}
            className="text-muted-foreground border-border border-b py-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      <div
        key={monthStart.toISOString()}
        className="relative grid flex-grow overflow-y-auto md:grid-cols-7"
      >
        {calendarDays.map((day) => {
          const dayEvents = visibleEvents.filter((event) => isSameDay(event.start, day));
          const isToday = isSameDay(day, today);
          const isCurrentMonth = isSameMonth(day, date);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "relative flex aspect-square cursor-pointer flex-col border-r border-b p-2",
                !isCurrentMonth && "bg-muted/50 hidden md:flex"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setDate(day);
                setMode("day");
              }}
            >
              <div
                className={cn(
                  "flex aspect-square w-fit flex-col items-center justify-center rounded-full p-1 text-sm font-medium",
                  isToday && "bg-primary text-background"
                )}
              >
                {format(day, "d")}
              </div>
              <div className="mt-1 flex flex-col gap-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <CalendarEvent key={event.id} event={event} className="relative h-auto" month />
                ))}
                {dayEvents.length > 3 && (
                  <div
                    key={`more-${day.toISOString()}`}
                    className="text-muted-foreground text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDate(day);
                      setMode("day");
                    }}
                  >
                    +{dayEvents.length - 3} autre(s)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
