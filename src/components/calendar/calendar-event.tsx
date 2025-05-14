import type { CalendarEvent as CalendarEventType } from "@/components/calendar/calendar-types";
import { useCalendarContext } from "@/components/calendar/calendar-context";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface EventPosition {
  left: string;
  width: string;
  top: string;
  height: string;
}

function getOverlappingEvents(
  currentEvent: CalendarEventType,
  events: CalendarEventType[]
): CalendarEventType[] {
  return events.filter((event) => {
    if (event.id === currentEvent.id) return false;
    return (
      currentEvent.start < event.end &&
      currentEvent.end > event.start &&
      isSameDay(currentEvent.start, event.start)
    );
  });
}

function calculateEventPosition(
  event: CalendarEventType,
  allEvents: CalendarEventType[]
): EventPosition {
  const overlappingEvents = getOverlappingEvents(event, allEvents);
  const group = [event, ...overlappingEvents].sort((a, b) => a.start.getTime() - b.start.getTime());
  const position = group.indexOf(event);
  const width = `${100 / (overlappingEvents.length + 1)}%`;
  const left = `${(position * 100) / (overlappingEvents.length + 1)}%`;

  const startHour = event.start.getHours();
  const startMinutes = event.start.getMinutes();

  let endHour = event.end.getHours();
  let endMinutes = event.end.getMinutes();

  if (!isSameDay(event.start, event.end)) {
    endHour = 23;
    endMinutes = 59;
  }

  const topPosition = startHour * 128 + (startMinutes / 60) * 128;
  const duration = endHour * 60 + endMinutes - (startHour * 60 + startMinutes);
  const height = (duration / 60) * 128;

  return {
    left,
    width,
    top: `${topPosition}px`,
    height: `${height}px`
  };
}

export default function CalendarEvent({
  event,
  month = false,
  className
}: {
  event: CalendarEventType;
  month?: boolean;
  className?: string;
}) {
  const { events, setSelectedEvent, setManageEventDialogOpen } = useCalendarContext();
  const style = month ? {} : calculateEventPosition(event, events);

  return (
    <div
      className={cn(
        `cursor-pointer truncate rounded-md px-3 py-1.5 transition-all duration-300 bg-${event.color}-500/10 hover:bg-${event.color}-500/20 border border-${event.color}-500`,
        !month && "absolute",
        className
      )}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedEvent(event);
        setManageEventDialogOpen(true);
      }}
    >
      <div
        className={cn(
          `flex w-full flex-col text-${event.color}-500`,
          month && "flex-row items-center justify-between"
        )}
      >
        <div className="flex flex-wrap items-center gap-x-2">
          <p className={cn("truncate font-bold", month && "text-xs")}>{event.title}</p>
          <Badge className={cn(`bg-${event.color}-500`, "max-w-full", month && "hidden")}>
            {event.room}
          </Badge>
        </div>
        <p className={cn("text-sm", month && "text-xs")}>
          <span>{format(event.start, "H:mm")}</span>
          <span className={cn("mx-1", month && "hidden")}>-</span>
          <span className={cn(month && "hidden")}>{format(event.end, "H:mm")}</span>
        </p>
      </div>
    </div>
  );
}
