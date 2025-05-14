import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
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
import { ColorPicker } from "@/components/form/color-picker";
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

const formSchema = z
  .object({
    title: z.string().min(1, "L'intitulé est requis"),
    start: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date de début invalide"
    }),
    end: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date de fin invalide"
    }),
    color: z.string()
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
  const {
    manageEventDialogOpen,
    setManageEventDialogOpen,
    selectedEvent,
    setSelectedEvent,
    events,
    setEvents
  } = useCalendarContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      start: "",
      end: "",
      color: "blue"
    }
  });

  useEffect(() => {
    if (selectedEvent) {
      form.reset({
        title: selectedEvent.title,
        start: format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm"),
        end: format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm"),
        color: selectedEvent.color
      });
    }
  }, [selectedEvent, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedEvent) return;

    const updatedEvent = {
      ...selectedEvent,
      title: values.title,
      start: new Date(values.start),
      end: new Date(values.end),
      color: values.color
    };

    setEvents(events.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)));
    handleClose();
  }

  function handleDelete() {
    if (!selectedEvent) return;
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    handleClose();
  }

  function handleClose() {
    setManageEventDialogOpen(false);
    setSelectedEvent(null);
    form.reset();
  }

  return (
    <Dialog open={manageEventDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
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

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Couleur</FormLabel>
                  <FormControl>
                    <ColorPicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" type="button">
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer une conférence</AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir supprimer la conférence ? Cette action ne peut pas
                      être annulée.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit">Mettre à jour</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
