import { Text, View, Image, useWindowDimensions } from "react-native";
import { Center } from "@gluestack-ui/react";

interface Props {
  id: string;
  title: string;
  description: string;
  image: number;
}

export const TutorialItem = ({ item }: { item: Props }) => {
  const { width } = useWindowDimensions();
  const modalWidth = width * 0.9;
  const containerWidth = Math.floor(modalWidth - 32);

  return (
    <View
      style={{
        width: containerWidth,
        gap: 24,
      }}
    >
      <Center>
        <Image
          source={item.image}
          style={{
            width: containerWidth,
            height: 186,
          }}
        />
      </Center>
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
