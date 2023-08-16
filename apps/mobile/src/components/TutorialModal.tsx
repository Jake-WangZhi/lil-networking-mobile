import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalBackdrop,
} from "@gluestack-ui/react";
import { Text, View, FlatList, Animated } from "react-native";
import { useRef, useState } from "react";
import { TutorialItem } from "~/components/TutorialItem";
import { Paginator } from "~/components/Paginator";
import Ripple from "react-native-material-ripple";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { TutorialModalProps } from "~/types";

interface Props {
  data: TutorialModalProps[];
}

export const TutorialModal = ({ data }: Props) => {
  const ref = useRef(null);
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [nextButton, setNextButton] = useState("Next");

  const scrollTo = async () => {
    if (currentIndex < data.length - 1) {
      if (currentIndex + 1 === data.length - 1) {
        setNextButton("Done");
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((index) => index + 1);
    } else {
      setShowModal(false);

      try {
        await AsyncStorage.setItem("@viewedDashboardTutorial", "true");
      } catch (err) {
        console.log("Error @setViewedDashboardTutorial", err);
      }
    }
  };

  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent>
          <View className="bg-dark-blue">
            <View
              style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
              className="space-y-6"
            >
              <ModalBody style={{ paddingTop: 16, paddingBottom: 0 }}>
                <FlatList
                  data={data}
                  renderItem={({ item }) => <TutorialItem item={item} />}
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
              </ModalBody>
              <ModalFooter
                style={{
                  justifyContent: "space-between",
                  paddingTop: 0,
                }}
              >
                <Paginator data={data} scrollX={scrollX} />
                <View className="flex-row">
                  <Ripple
                    onPress={async () => {
                      setShowModal(false);

                      try {
                        await AsyncStorage.setItem(
                          "@viewedDashboardTutorial",
                          "true"
                        );
                      } catch (err) {
                        console.log("Error @setViewedDashboardTutorial", err);
                      }
                    }}
                    className="px-6 py-3"
                  >
                    <Text className="text-white opacity-70 text-base">
                      Skip
                    </Text>
                  </Ripple>
                  <Ripple onPress={() => scrollTo()} className="px-6 py-3">
                    <Text className="text-light-blue text-base font-semibold">
                      {nextButton}
                    </Text>
                  </Ripple>
                </View>
              </ModalFooter>
            </View>
          </View>
        </ModalContent>
      </Modal>
    </Center>
  );
};
