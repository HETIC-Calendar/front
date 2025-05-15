import { useCalendarContext } from "@/components/calendar/calendar-context";
import { loadEvents } from "@/lib/utils";
import { approveTalk, rejectTalk } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Check as CheckIcon, X as XIcon } from "lucide-react";
import { toast } from "sonner";

const CalendarActions = ({ handleClose }: { handleClose: () => void }) => {
  const { selectedEvent, setEvents } = useCalendarContext();

  async function handleApprove() {
    if (!selectedEvent) return;
    await approveTalk(selectedEvent.id);
    await loadEvents(setEvents);
    toast.success("La conférence a bien été approuvée");
    handleClose();
  }

  async function handleReject() {
    if (!selectedEvent) return;
    await rejectTalk(selectedEvent.id);
    await loadEvents(setEvents);
    toast.success("La conférence a bien été rejetée");
    handleClose();
  }

  return (
    <>
      <Button variant="success" type="button" onClick={handleApprove}>
        <CheckIcon />
      </Button>
      <Button variant="destructive" type="button" onClick={handleReject}>
        <XIcon />
      </Button>
    </>
  );
};

export default CalendarActions;
