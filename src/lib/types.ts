export type User = {
  id: string;
  email: string;
  role: "organizer" | "talker";
};

export interface Room {
  id: string;
  name: string;
  capacity: number;
}

export interface Talk {
  id: string;
  status: TalkStatus;
  title: string;
  subject: TalkSubject;
  description: string;
  speaker: string;
  room: Room;
  level: TalkLevel;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TalkStatus = "PENDING_APPROVAL" | "APPROVED" | "REJECTED";

export type TalkSubject =
  | "AI"
  | "WEB_DEVELOPMENT"
  | "MOBILE_DEVELOPMENT"
  | "DATA_SCIENCE"
  | "CLOUD_COMPUTING"
  | "DEVOPS"
  | "CYBER_SECURITY"
  | "BLOCKCHAIN"
  | "IOT"
  | "GAME_DEVELOPMENT";

export type TalkLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
