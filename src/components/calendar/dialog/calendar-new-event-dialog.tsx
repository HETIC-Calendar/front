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
import { createTalk, fetchRooms } from "@/lib/api";
import { TALK_LEVEL_LABELS, TALK_SUBJECT_LABELS, type Room } from "@/lib/types";
import { loadEvents } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z
  .object({
    title: z.string().min(1, "L'intitulé est requis"),
    subject: z.enum(
      [
        "AI",
        "WEB_DEVELOPMENT",
        "MOBILE_DEVELOPMENT",
        "DATA_SCIENCE",
        "CLOUD_COMPUTING",
        "DEVOPS",
        "CYBER_SECURITY",
        "BLOCKCHAIN",
        "IOT",
        "GAME_DEVELOPMENT"
      ],
      { message: "Le sujet est requis" }
    ),
    description: z.string().min(2, "La description doit contenir au moins 2 caractères"),
    roomId: z.string().min(1, "La salle est requise"),
    startTime: z.string().datetime({ message: "Date de début invalide" }),
    endTime: z.string().datetime({ message: "Date de fin invalide" }),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], { message: "Le niveau est requis" })
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      return end >= start;
    },
    {
      message: "La date de fin doit être après la date de début",
      path: ["end"]
    }
  );

const subjects = Object.entries(TALK_SUBJECT_LABELS);
const levels = Object.entries(TALK_LEVEL_LABELS);

export default function CalendarNewEventDialog() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { newEventDialogOpen, setNewEventDialogOpen, date, setEvents } = useCalendarContext();

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
      subject: undefined,
      description: "",
      roomId: "",
      startTime: format(date, "yyyy-MM-dd'T'HH:mm"),
      endTime: format(date, "yyyy-MM-dd'T'HH:mm"),
      level: undefined
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newEvent = {
      title: values.title,
      subject: values.subject,
      description: values.description,
      roomId: values.roomId,
      startTime: new Date(values.startTime),
      endTime: new Date(values.endTime),
      level: values.level
    };

    await createTalk(newEvent);
    await loadEvents(setEvents);

    setNewEventDialogOpen(false);
    form.reset();
  }

  return (
    <Dialog open={newEventDialogOpen} onOpenChange={setNewEventDialogOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Proposer une conférence</DialogTitle>
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
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Sujet</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sujet de la conférence" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(([subject, label]) => (
                          <SelectItem key={subject} value={subject}>
                            {label}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description de la conférence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Salle</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner une salle" />
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
              name="startTime"
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
              name="endTime"
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
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Niveau</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Niveau de la conférence" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map(([level, label]) => (
                          <SelectItem key={level} value={level}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Proposer la conférence</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
