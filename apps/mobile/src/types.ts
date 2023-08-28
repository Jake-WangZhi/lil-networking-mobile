import type { ImageSourcePropType } from "react-native";

export interface Slide {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const ActionType = {
  PAST: "past",
  UPCOMING: "upcoming",
} as const;

export type ObjectValues<T> = T[keyof T];

export type ActionType = ObjectValues<typeof ActionType>;
