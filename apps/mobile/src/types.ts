import type { ImageSourcePropType } from "react-native";

export interface Slide {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export interface Action {
  contactId: string;
  contactFirstName: string;
  contactLastName: string;
  days: number;
  goalDays: number;
  title: string;
  contactCreatedAt?: string;
}

export enum ActionType {
  Past = "past",
  Upcoming = "upcoming",
}
