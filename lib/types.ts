export type EventType = "all" | "internship" | "course" | "guest-lecture" | "hackathon";

export interface Event {
  id: number;
  type: Exclude<EventType, "all">;
  title: string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  link: string;
  participants: number | null;
  image: string;
  deadline?: string;
  stipend?: string;
  duration?: string;
  price?: string;
  speaker?: string;
  speakerRole?: string;
  prizes?: string[];
  teamSize?: string;
}

export type PeerStatus = "online" | "offline" | "busy";

export interface ChatMessage {
  id: string;
  senderId: number;
  content: string;
  timestamp: Date;
  type: "text" | "system";
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  topic: string;
  members: number[];
  createdBy: number;
  createdAt: Date;
  messages: ChatMessage[];
  maxMembers: number;
  isPublic: boolean;
}