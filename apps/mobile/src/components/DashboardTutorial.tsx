import {
  Button,
  Center,
  Modal,
  ModalHeader,
  ButtonText,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalBackdrop,
} from "@gluestack-ui/react";
import { Text, View, Pressable } from "react-native";
import { useRef, useState } from "react";

export const DashboardTutorial = () => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
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
        size={"lg"}
      >
        <ModalBackdrop />
        <ModalContent>
          <View className="bg-dark-blue">
            <View
              style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
              className="space-y-6"
            >
              <ModalHeader>
                <View className="bg-dark-blue w-full h-[185]"></View>
              </ModalHeader>
              <ModalBody>
                <Center>
                  <Text className="text-white text-2xl font-semibold">
                    Add Contacts
                  </Text>
                  <Text className="text-white text-base text-center">
                    Create new or easily import contacts from your phone to get
                    started.
                  </Text>
                </Center>
              </ModalBody>
              <ModalFooter style={{ justifyContent: "space-between" }}>
                <Pressable
                  onPress={() => {
                    setShowModal(false);
                  }}
                  className="px-6 py-3"
                >
                  <Text className="text-white opacity-70 text-base">Skip</Text>
                </Pressable>
                <View className="flex-row">
                  <Pressable
                    onPress={() => {
                      setShowModal(false);
                    }}
                    className="px-6 py-3"
                  >
                    <Text className="text-white opacity-70 text-base">
                      Skip
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setShowModal(false);
                    }}
                    className="px-6 py-3"
                  >
                    <Text className="text-light-blue text-base font-semibold">
                      Next
                    </Text>
                  </Pressable>
                </View>
              </ModalFooter>
            </View>
          </View>
        </ModalContent>
      </Modal>
    </Center>
  );
};
