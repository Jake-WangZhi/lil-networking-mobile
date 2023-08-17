import type { Animated as AnimatedType } from "react-native";
import { View, Animated } from "react-native";
import type { TutorialModalProps } from "~/types";

interface PaginatorProps {
  data: TutorialModalProps[];
  scrollX: AnimatedType.Value;
  containerWidth: number;
}

export const Paginator = ({
  data,
  scrollX,
  containerWidth,
}: PaginatorProps) => {
  return (
    <View className="flex flex-row">
      {data.map((_, i) => {
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
          outputRange: ["#FFFFFF", "#38ACE2", "#FFFFFF"],
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
