import { Text, View, Image } from "react-native";
import type { TutorialModalProps } from "~/types";

interface Props {
  item: TutorialModalProps;
  containerWidth: number;
}

export const TutorialItem = ({ item, containerWidth }: Props) => {
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
      <View className="space-y-2 flex justify-center items-center">
        <Text className="text-white text-2xl font-semibold text-center">
          {item.title}
        </Text>
        <Text className="text-white text-base text-center">
          {item.description}
        </Text>
      </View>
    </View>
  );
};
