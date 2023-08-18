import {
  Text,
  View,
  FlatList,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useRef, useState } from "react";
import { TutorialItem } from "~/components/TutorialItem";
import { Paginator } from "~/components/Paginator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { TutorialModalProps } from "~/types";
import Modal from "react-native-modal";
import Ripple from "react-native-material-ripple";

interface Props {
  data: TutorialModalProps[];
}

export const TutorialModal = ({ data }: Props) => {
  const slidesRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [nextButton, setNextButton] = useState("Next");
  const { width } = useWindowDimensions();
  //The width of modal is 90% of the screen width
  //also minus the horizontal paddings
  const containerWidth = Math.floor(width * 0.9) - 32;

  const scrollTo = async () => {
    if (currentIndex < data.length - 1) {
      if (currentIndex + 1 === data.length - 1) {
        setNextButton("Done");
      }

      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((index) => index + 1);
    } else {
      setShowModal(false);

      try {
        await AsyncStorage.setItem("@hasViewedDashboardTutorial", "true");
      } catch (err) {
        console.log("Error @setHasViewedDashboardTutorial", err);
      }
    }
  };

  const skip = async () => {
    setShowModal(false);

    try {
      await AsyncStorage.setItem("@hasViewedDashboardTutorial", "true");
    } catch (err) {
      console.log("Error @setHasViewedDashboardTutorial", err);
    }
  };

  return (
    <View className="flex items-center justify-center">
      <Modal
        backdropColor="#121212"
        backdropOpacity={0.3}
        isVisible={showModal}
        onBackdropPress={skip}
        animationIn="fadeIn"
        animationOut="fadeIn"
      >
        <View className="bg-light-grey p-4 space-y-6">
          <FlatList
            data={data}
            renderItem={({ item }: { item: TutorialModalProps }) => (
              <TutorialItem item={item} containerWidth={containerWidth} />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            ref={slidesRef}
          />

          <View className="flex-row justify-between items-center">
            <Paginator
              data={data}
              scrollX={scrollX}
              containerWidth={containerWidth}
            />
            <View className="flex-row">
              <Ripple onPress={skip} className="px-6 py-3">
                <Text className="text-white opacity-70 text-base">Skip</Text>
              </Ripple>
              <Ripple onPress={scrollTo} className="px-6 py-3">
                <Text className="text-light-blue text-base font-semibold">
                  {nextButton}
                </Text>
              </Ripple>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
