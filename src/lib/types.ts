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
  roomId: string;
  level: TalkLevel;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TalkStatus = "PENDING_APPROVAL" | "APPROVED" | "REJECTED";

type TalkSubject =
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

type TalkLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
