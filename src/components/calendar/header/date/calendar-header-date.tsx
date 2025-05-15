import { useCalendarContext } from "@/components/calendar/calendar-context";
import { format } from "date-fns";
import CalendarHeaderDateIcon from "@/components/calendar/header/date/calendar-header-date-icon";
import CalendarHeaderDateChevrons from "@/components/calendar/header/date/calendar-header-date-chevrons";
import CalendarHeaderDateBadge from "@/components/calendar/header/date/calendar-header-date-badge";
import { fr } from "date-fns/locale";

export default function CalendarHeaderDate() {
  const { date } = useCalendarContext();
  return (
    <div className="flex items-center gap-2">
      <CalendarHeaderDateIcon />
      <div>
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">{format(date, "MMMM yyyy", { locale: fr })}</p>
          <CalendarHeaderDateBadge />
        </div>
        <CalendarHeaderDateChevrons />
      </div>
    </div>
  );
}
