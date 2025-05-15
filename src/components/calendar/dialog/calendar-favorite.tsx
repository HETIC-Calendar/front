import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

const CalendarFavorite = ({ eventId }: { eventId: string }) => {
  const [storageItem, setStorageItem] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const isFavourited = storageItem.includes(eventId);

  const handleToggleFavourite = () => {
    if (!isFavourited) {
      const newStorageItem = [...storageItem, eventId];
      setStorageItem(newStorageItem);
      localStorage.setItem("favorites", JSON.stringify(newStorageItem));
    } else {
      const newStorageItem = storageItem.filter((savedId) => savedId !== eventId);
      setStorageItem(newStorageItem);
      localStorage.setItem("favorites", JSON.stringify(newStorageItem));
    }
  };

  return (
    <Button variant="ghost" type="button" onClick={handleToggleFavourite} className="h-9">
      <HeartIcon
        className={`h-6 w-6 ${isFavourited ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
      />
      <p>{isFavourited ? "Enlever des favoris" : "Ajouter aux favoris"}</p>
    </Button>
  );
};

export default CalendarFavorite;
