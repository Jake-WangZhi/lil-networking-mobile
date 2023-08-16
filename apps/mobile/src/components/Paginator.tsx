import type { Animated as AnimatedType } from "react-native";
import { View, useWindowDimensions, Animated } from "react-native";

interface Item {
  id: string;
  title: string;
  description: string;
  image: number;
}

interface PaginatorProps {
  data: Item[];
  scrollX: AnimatedType.Value;
}

export const Paginator = ({ data, scrollX }: PaginatorProps) => {
  const { width } = useWindowDimensions();
  const modalWidth = width * 0.9;
  const containerWidth = Math.floor(modalWidth - 32);
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
