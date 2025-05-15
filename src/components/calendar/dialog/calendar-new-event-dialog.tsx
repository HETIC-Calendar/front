import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { fetchRooms } from "@/lib/api";
import type { Room } from "@/lib/types";

const formSchema = z
  .object({
    title: z.string().min(1, "L'intitulé est requis"),
    room: z.string().min(1, "La salle est requise"),
    start: z.string().datetime({ message: "Date de début invalide" }),
    end: z.string().datetime({ message: "Date de fin invalide" })
  })
  .refine(
    (data) => {
      const start = new Date(data.start);
      const end = new Date(data.end);
      return end >= start;
    },
    {
      message: "La date de fin doit être après la date de début",
      path: ["end"]
    }
  );

export default function CalendarNewEventDialog() {
  const [rooms, setRooms] = useState([]);
  const { newEventDialogOpen, setNewEventDialogOpen, date, events, setEvents } =
    useCalendarContext();

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
      start: format(date, "yyyy-MM-dd'T'HH:mm"),
      end: format(date, "yyyy-MM-dd'T'HH:mm")
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newEvent = {
      id: crypto.randomUUID(),
      title: values.title,
      status: "PENDING_APPROVAL",
      room: values.room,
      start: new Date(values.start),
      end: new Date(values.end),
      color: "orange"
    };

    setEvents([...events, newEvent]);
    setNewEventDialogOpen(false);
    form.reset();
  }

  return (
    <Dialog open={newEventDialogOpen} onOpenChange={setNewEventDialogOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Créer une conférence</DialogTitle>
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
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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

            <div className="flex justify-end">
              <Button type="submit">Créer la conférence</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
