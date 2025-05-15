import { useCalendarContext } from "@/components/calendar/calendar-context";
import { loadEvents } from "@/lib/utils";
import { approveTalk, rejectTalk } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const CalendarActions = ({ handleClose }: { handleClose: () => void }) => {
  const { selectedEvent, setEvents } = useCalendarContext();

  async function handleApprove() {
    if (!selectedEvent) return;
    await approveTalk(selectedEvent.id);
    await loadEvents(setEvents);
    handleClose();
  }

  async function handleReject() {
    if (!selectedEvent) return;
    await rejectTalk(selectedEvent.id);
    await loadEvents(setEvents);
    handleClose();
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="success" type="button">
            Approuver
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approuver une conférence</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir approuver la conférence ? Cette action ne peut pas être
              annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove}>Approuver</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" type="button">
            Rejeter
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejeter une conférence</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir rejeter la conférence ? Cette action ne peut pas être
              annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject}>Rejeter</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CalendarActions;
