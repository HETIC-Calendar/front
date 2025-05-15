import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { TalkSubject, TalkLevel } from "@/lib/types";
import { TALK_SUBJECT_LABELS, TALK_LEVEL_LABELS } from "@/lib/types";
import { useCalendarContext } from "@/components/calendar/calendar-context";
import { Label } from "@/components/ui/label";

export default function CalendarHeaderActionsFilters() {
  const { filters, setFilters } = useCalendarContext();

  return (
    <>
      <Checkbox
        id="favorites"
        checked={filters.byFavorites}
        onCheckedChange={(checked: boolean) => {
          setFilters({
            ...filters,
            byFavorites: checked
          });
        }}
      />
      <Label htmlFor="favorites">Mes favoris</Label>
      <Select
        value={filters?.selectedLevel || "All"}
        onValueChange={(value) => {
          setFilters({
            ...filters,
            selectedLevel: value === "All" ? null : (value as TalkLevel)
          });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Niveau" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">Tous les niveaux</SelectItem>
          {Object.entries(TALK_LEVEL_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters?.selectedSubject || "All"}
        onValueChange={(value) => {
          setFilters({
            ...filters,
            selectedSubject: value === "All" ? null : (value as TalkSubject)
          });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sujet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">Tous les sujets</SelectItem>
          {Object.entries(TALK_SUBJECT_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
