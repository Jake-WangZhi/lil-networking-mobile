import { Text, View, Image } from "react-native";
import type { Slide } from "~/types";

interface Props {
  slide: Slide;
  containerWidth: number;
}

export const TutorialSlide = ({ slide, containerWidth }: Props) => {
  return (
    <View
      style={{
        width: containerWidth,
        gap: 24,
      }}
    >
      <View
        style={{
          width: containerWidth,
          height: 186,
          backgroundColor: "#0F1A24",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={slide.image} />
      </View>
      <View className="space-y-2 flex justify-center items-center">
        <Text className="text-white text-2xl font-semibold text-center">
          {slide.title}
        </Text>
        <Text className="text-white text-base text-center">
          {slide.description}
        </Text>
      </View>
    </View>
  );
};
