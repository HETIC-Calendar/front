import { toast } from "sonner";
import { deleteTalk } from "@/lib/api";
import { loadEvents } from "@/lib/utils";
import { useCalendarContext } from "@/components/calendar/calendar-context";
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

const CalendarDelete = ({ handleClose }: { handleClose: () => void }) => {
  const { selectedEvent, setEvents } = useCalendarContext();

  async function handleDelete() {
    if (!selectedEvent) return;
    await deleteTalk(selectedEvent.id);
    await loadEvents(setEvents);
    toast.success("La conférence a été supprimée avec succès");
    handleClose();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" type="button">
          Supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer une conférence</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer la conférence ? Cette action ne peut pas être
            annulée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CalendarDelete;
