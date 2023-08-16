import {
  Button,
  Center,
  Modal,
  ButtonText,
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
const img1 = require("~/images/onboarding/dashboard/add_contacts.png");
const img2 = require("~/images/onboarding/dashboard/stats.png");
const img3 = require("~/images/onboarding/dashboard/priority.png");

const data = [
  {
    id: "1",
    title: "Add Contacts",
    description:
      "Create new or easily import contacts from your phone to get started.",
    image: img1,
  },
  {
    id: "2",
    title: "Networking Goals",
    description: "Set monthly goals to build and sustain your network.",
    image: img2,
  },
  {
    id: "3",
    title: "Contact Reminders",
    description:
      "Automated and priority sorted reminders appear based on individual cadence.",
    image: img3,
  },
];

export const DashboardTutorial = () => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [nextButton, setNextButton] = useState("Next");

  const scrollTo = () => {
    if (currentIndex < data.length - 1) {
      if (currentIndex + 1 === data.length - 1) {
        setNextButton("Done");
      }
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((index) => index + 1);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Center>
      <Button onPress={() => setShowModal(true)} ref={ref}>
        <ButtonText>Show Modal</ButtonText>
      </Button>
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
                    onPress={() => {
                      setShowModal(false);
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
