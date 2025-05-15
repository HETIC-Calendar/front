import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TalkStatus } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hours = Array.from({ length: 24 }, (_, i) => i);
export const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

export const getEventColor = (status: TalkStatus) => {
  switch (status) {
    case "PENDING_APPROVAL":
      return "orange";
    case "APPROVED":
      return "emerald";
    case "REJECTED":
      return "red";
  }
};
