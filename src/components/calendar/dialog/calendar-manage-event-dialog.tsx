import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCalendarContext } from "@/components/calendar/calendar-context";
import { format } from "date-fns";
import { DateTimePicker } from "@/components/form/date-time-picker";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { approveTalk, fetchRooms, rejectTalk } from "@/lib/api";
import type { Room } from "@/lib/types";
import { loadEvents } from "@/lib/utils";
import { useStore } from "@/store/store";

const formSchema = z
  .object({
    title: z.string().min(1, "L'intitulé est requis"),
    room: z.string().min(1, "La salle est requise"),
    start: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date de début invalide"
    }),
    end: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date de fin invalide"
    })
  })
  .refine(
    (data) => {
      try {
        const start = new Date(data.start);
        const end = new Date(data.end);
        return end >= start;
      } catch {
        return false;
      }
    },
    {
      message: "La date de fin doit être après la date de début",
      path: ["end"]
    }
  );

export default function CalendarManageEventDialog() {
  const { hasRole } = useStore();
  const [rooms, setRooms] = useState<Room[]>([]);
  const {
    manageEventDialogOpen,
    setManageEventDialogOpen,
    selectedEvent,
    setSelectedEvent,
    setEvents
  } = useCalendarContext();

  useEffect(() => {
    const loadRooms = async () => {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    };
    loadRooms();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      room: "",
      start: "",
      end: ""
    }
  });

  useEffect(() => {
    if (selectedEvent) {
      form.reset({
        title: selectedEvent.title,
        room: selectedEvent.room.id,
        start: format(selectedEvent.startTime, "yyyy-MM-dd'T'HH:mm"),
        end: format(selectedEvent.endTime, "yyyy-MM-dd'T'HH:mm")
      });
    }
  }, [selectedEvent, form]);

  function onSubmit() {
    if (!selectedEvent) return;
    handleClose();
  }

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

  function handleClose() {
    setManageEventDialogOpen(false);
    setSelectedEvent(null);
    form.reset();
  }

  return (
    <Dialog open={manageEventDialogOpen} onOpenChange={handleClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Modifier une conférence</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Intitulé</FormLabel>
                  <FormControl>
                    <Input placeholder="Intitulé de la conférence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Salle</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Salles" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room: Room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Date de début</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Date de fin</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between gap-2">
              {selectedEvent &&
                selectedEvent.status === "PENDING_APPROVAL" &&
                hasRole("PLANNER") && (
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
                            Êtes-vous sûr de vouloir approuver la conférence ? Cette action ne peut
                            pas être annulée.
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
                            Êtes-vous sûr de vouloir rejeter la conférence ? Cette action ne peut
                            pas être annulée.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={handleReject}>Rejeter</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              <Button type="submit">Mettre à jour</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
