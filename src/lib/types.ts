export interface Room {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  status: EventStatus;
  title: string;
  subject: string;
  description: string;
  speaker: string;
  roomId: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export type EventStatus = "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
