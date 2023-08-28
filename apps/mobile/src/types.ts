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
  contactLastName: string | null;
  days: number;
  goalDays: number;
  title: string | null;
  isNewUser: boolean;
}

export const ActionType = {
  PAST: "past",
  UPCOMING: "upcoming",
} as const;

export type ObjectValues<T> = T[keyof T];

export type ActionType = ObjectValues<typeof ActionType>;
