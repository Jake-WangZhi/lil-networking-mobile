import { Text, View, Image, useWindowDimensions } from "react-native";
import { Center } from "@gluestack-ui/react";
import type { TutorialModalProps } from "~/types";

export const TutorialItem = ({ item }: { item: TutorialModalProps }) => {
  const { width } = useWindowDimensions();
  //The width of gluestack-ui modal with lg size is 90% of the screen width
  //The maximum width is 640, also minus the horizontal paddings
  const containerWidth = Math.min(Math.floor(width * 0.9), 640) - 32;

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
        <Image source={item.image} />
      </View>
      <Center style={{ gap: 8 }}>
        <Text className="text-white text-2xl font-semibold text-center">
          {item.title}
        </Text>
        <Text className="text-white text-base text-center">
          {item.description}
        </Text>
      </Center>
    </View>
  );
};
