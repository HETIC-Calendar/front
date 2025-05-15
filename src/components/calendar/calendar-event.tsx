import { useCalendarContext } from "@/components/calendar/calendar-context";
import { format, isSameDay } from "date-fns";
import { cn, getTalkColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TALK_SUBJECT_LABELS, type Talk } from "@/lib/types";

interface EventPosition {
  left: string;
  width: string;
  top: string;
  height: string;
}

function getOverlappingEvents(currentEvent: Talk, events: Talk[]): Talk[] {
  return events.filter((event) => {
    if (event.id === currentEvent.id) return false;
    return (
      currentEvent.startTime < event.endTime &&
      currentEvent.endTime > event.startTime &&
      isSameDay(currentEvent.startTime, event.startTime)
    );
  });
}

function calculateEventPosition(event: Talk, allEvents: Talk[]): EventPosition {
  const overlappingEvents = getOverlappingEvents(event, allEvents);
  const group = [event, ...overlappingEvents].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );
  const position = group.indexOf(event);
  const width = `${100 / (overlappingEvents.length + 1)}%`;
  const left = `${(position * 100) / (overlappingEvents.length + 1)}%`;

  const startHour = new Date(event.startTime).getHours();
  const startMinutes = new Date(event.startTime).getMinutes();

  let endHour = new Date(event.endTime).getHours();
  let endMinutes = new Date(event.endTime).getMinutes();

  if (!isSameDay(event.startTime, event.endTime)) {
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
  event: Talk;
  month?: boolean;
  className?: string;
}) {
  const { events, setSelectedEvent, setManageEventDialogOpen } = useCalendarContext();
  const style = month ? {} : calculateEventPosition(event, events);

  return (
    <div
      className={cn(
        `cursor-pointer truncate rounded-md px-3 py-1.5 transition-all duration-300 bg-${getTalkColor(event.status)}-500/10 hover:bg-${getTalkColor(event.status)}-500/20 border border-${getTalkColor(event.status)}-500`,
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
          `flex w-full flex-col text-${getTalkColor(event.status)}-500`,
          month && "flex-row items-center justify-between"
        )}
      >
        <div className="flex flex-wrap items-center gap-x-2">
          <p className={cn("truncate font-bold", month && "text-xs")}>{event.title}</p>
          <div className="flex flex-wrap gap-1">
            <Badge
              className={cn(
                `bg-${getTalkColor(event.status)}-500`,
                "max-w-full",
                month && "hidden"
              )}
            >
              {event.room.name}
            </Badge>
            <Badge
              className={cn(
                `bg-${getTalkColor(event.status)}-500`,
                "max-w-full",
                month && "hidden"
              )}
            >
              {TALK_SUBJECT_LABELS[event.subject]}
            </Badge>
          </div>
        </div>
        <p className={cn("text-sm", month && "text-xs")}>
          <span>{format(event.startTime, "H:mm")}</span>
          <span className={cn("mx-1", month && "hidden")}>-</span>
          <span className={cn(month && "hidden")}>{format(event.endTime, "H:mm")}</span>
        </p>
      </div>
    </div>
  );
}
