import type { Animated as AnimatedType } from "react-native";
import { View, Animated } from "react-native";
import type { Slide } from "~/types";
import { colors } from "@foundrymakes/tailwind-config";

interface PaginatorProps {
  slides: Slide[];
  scrollX: AnimatedType.Value;
  containerWidth: number;
}

export const Paginator = ({
  slides,
  scrollX,
  containerWidth,
}: PaginatorProps) => {
  return (
    <View className="flex flex-row">
      {slides.map((_, i) => {
        const inputRange = [
          (i - 1) * containerWidth,
          i * containerWidth,
          (i + 1) * containerWidth,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [colors.white, colors["light-blue"], colors.white],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: ["0.7", "1", "0.7"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i.toString()}
            style={{
              width: dotWidth,
              opacity,
              backgroundColor,
            }}
            className="h-2 rounded bg-light-blue mx-2"
          />
        );
      })}
    </View>
  );
};
