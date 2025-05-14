import { useCalendarContext } from '../../calendar-context'
import { Calendar } from '@/components/ui/calendar'
import { fr } from "date-fns/locale"

export default function CalendarBodyDayCalendar() {
  const { date, setDate } = useCalendarContext()
  return (
    <Calendar
      locale={fr}
      selected={date}
      onSelect={(date: Date | undefined) => date && setDate(date)}
      mode="single"
    />
  )
}
