import type { ImageSourcePropType } from "react-native";

export interface Slide {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}
