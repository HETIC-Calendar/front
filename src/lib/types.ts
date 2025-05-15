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

export const TALK_SUBJECT_LABELS: Record<TalkSubject, string> = {
  AI: "Intelligence Artificielle",
  WEB_DEVELOPMENT: "Développement Web",
  MOBILE_DEVELOPMENT: "Développement Mobile",
  DATA_SCIENCE: "Data Science",
  CLOUD_COMPUTING: "Cloud Computing",
  DEVOPS: "DevOps",
  CYBER_SECURITY: "Cyber Securité",
  BLOCKCHAIN: "Blockchain",
  IOT: "Internet des Objets",
  GAME_DEVELOPMENT: "Développement Jeu"
} as const;

export type TalkLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export const TALK_LEVEL_LABELS: Record<TalkLevel, string> = {
  BEGINNER: "Débutant",
  INTERMEDIATE: "Intermédiaire",
  ADVANCED: "Avancé"
} as const;
