import { router } from "expo-router";
import { View, Text, TextInput } from "react-native";
import Ripple from "react-native-material-ripple";
import { Formik } from "formik";
import { Warning } from "phosphor-react-native";

import * as Yup from "yup";
import { useState } from "react";

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string(),
  title: Yup.string(),
  company: Yup.string(),
  reminder: Yup.number().required(),
  email: Yup.string().email("Invalid email").required(),
});

export default function CreateNewContact() {
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);

  const [selectedDays, setSelectedDays] = useState(30);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          title: "",
          company: "",
          reminder: 30,
          linkedIn: "",
          email: "",
          phone: "",
          links: [],
          tags: [],
          history: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            <View className="flex-row items-center">
              <View className="flex-row justify-start flex-1">
                <Ripple onPress={() => router.back()} className="py-3">
                  <Text className="text-white text-base">Cancel</Text>
                </Ripple>
              </View>
              <Text className="text-white text-xl font-semibold">
                Create Contact
              </Text>
              <View className="flex-row justify-end flex-1">
                <Ripple onPress={() => handleSubmit()} className="py-3">
                  <Text className="text-light-blue text-base font-semibold">
                    Save
                  </Text>
                </Ripple>
              </View>
            </View>

            <View className="space-y-4 mt-4">
              <Text className="text-white text-xl font-semibold">
                Primary Information
              </Text>
              <View className="space-y-1">
                <View className="flex-row items-center space-x-2">
                  <Text className="text-white text-base w-[74]">First *</Text>
                  <TextInput
                    className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                      (isFirstNameFocused && "border border-white rounded") ||
                      (errors.firstName && "border border-error rounded")
                    }`}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    selectionColor="white"
                    onFocus={() => setIsFirstNameFocused(true)}
                    onEndEditing={() => setIsFirstNameFocused(false)}
                  />
                </View>
                {touched.firstName && errors.firstName && (
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-white text-base w-[74]" />
                    <View className="flex-row items-center space-x-1">
                      <Warning color="#FB5913" size={16} weight="fill" />
                      <Text className="text-error">Required field</Text>
                    </View>
                  </View>
                )}
              </View>

              <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base w-[74]">Last</Text>
                <TextInput
                  className="bg-dark-grey h-12 flex-1 text-white p-2"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  selectionColor="white"
                />
              </View>

              <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base w-[74]">Title</Text>
                <TextInput
                  className="bg-dark-grey h-12 flex-1 text-white p-2"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  selectionColor="white"
                />
              </View>

              <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base w-[74]">Company</Text>
                <TextInput
                  className="bg-dark-grey h-12 flex-1 text-white p-2"
                  onChangeText={handleChange("company")}
                  onBlur={handleBlur("company")}
                  value={values.company}
                  selectionColor="white"
                />
              </View>

              <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base w-[82]">Reminder *</Text>
                <View className="flex-row space-x-2">
                  <Ripple
                    className={`bg-dark-grey rounded-full ${
                      selectedDays === 30 && "border border-light-blue"
                    }`}
                    onPress={() => setSelectedDays(30)}
                  >
                    <Text
                      className={`text-sm px-4 py-2 ${
                        selectedDays === 30 ? "text-light-blue" : "text-white"
                      }`}
                    >
                      30 days
                    </Text>
                  </Ripple>
                  <Ripple
                    className={`bg-dark-grey rounded-full ${
                      selectedDays === 60 && "border border-light-blue"
                    }`}
                    onPress={() => setSelectedDays(60)}
                  >
                    <Text
                      className={`text-sm px-4 py-2 ${
                        selectedDays === 60 ? "text-light-blue" : "text-white"
                      }`}
                    >
                      60 days
                    </Text>
                  </Ripple>
                  <Ripple
                    className={`bg-dark-grey rounded-full ${
                      selectedDays === 90 && "border border-light-blue"
                    }`}
                    onPress={() => setSelectedDays(90)}
                  >
                    <Text
                      className={`text-sm px-4 py-2 ${
                        selectedDays === 90 ? "text-light-blue" : "text-white"
                      }`}
                    >
                      90 days
                    </Text>
                  </Ripple>
                </View>
              </View>
            </View>

            <View className="space-y-4 mt-4">
              <Text className="text-white text-xl font-semibold">
                Primary Information
              </Text>
              <View className="space-y-1">
                <View className="flex-row items-center space-x-2">
                  <Text className="text-white text-base w-[74]">First *</Text>
                  <TextInput
                    className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                      (isFirstNameFocused && "border border-white rounded") ||
                      (errors.firstName && "border border-error rounded")
                    }`}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    selectionColor="white"
                    onFocus={() => setIsFirstNameFocused(true)}
                    onEndEditing={() => setIsFirstNameFocused(false)}
                  />
                </View>
                {touched.firstName && errors.firstName && (
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-white text-base w-[74]" />
                    <View className="flex-row items-center space-x-1">
                      <Warning color="#FB5913" size={16} weight="fill" />
                      <Text className="text-error">Required field</Text>
                    </View>
                  </View>
                )}
              </View>

              <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base w-[74]">Last</Text>
                <TextInput
                  className="bg-dark-grey h-12 flex-1 text-white p-2"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  selectionColor="white"
                />
              </View>

              <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base w-[74]">Title</Text>
                <TextInput
                  className="bg-dark-grey h-12 flex-1 text-white p-2"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  selectionColor="white"
                />
              </View>

              <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base w-[74]">Company</Text>
                <TextInput
                  className="bg-dark-grey h-12 flex-1 text-white p-2"
                  onChangeText={handleChange("company")}
                  onBlur={handleBlur("company")}
                  value={values.company}
                  selectionColor="white"
                />
              </View>

              <View className="flex-row items-center space-x-2">
                <Text className="text-white text-base w-[82]">Reminder *</Text>
                <View className="flex-row space-x-2">
                  <Ripple
                    className={`bg-dark-grey rounded-full ${
                      selectedDays === 30 && "border border-light-blue"
                    }`}
                    onPress={() => setSelectedDays(30)}
                  >
                    <Text
                      className={`text-sm px-4 py-2 ${
                        selectedDays === 30 ? "text-light-blue" : "text-white"
                      }`}
                    >
                      30 days
                    </Text>
                  </Ripple>
                  <Ripple
                    className={`bg-dark-grey rounded-full ${
                      selectedDays === 60 && "border border-light-blue"
                    }`}
                    onPress={() => setSelectedDays(60)}
                  >
                    <Text
                      className={`text-sm px-4 py-2 ${
                        selectedDays === 60 ? "text-light-blue" : "text-white"
                      }`}
                    >
                      60 days
                    </Text>
                  </Ripple>
                  <Ripple
                    className={`bg-dark-grey rounded-full ${
                      selectedDays === 90 && "border border-light-blue"
                    }`}
                    onPress={() => setSelectedDays(90)}
                  >
                    <Text
                      className={`text-sm px-4 py-2 ${
                        selectedDays === 90 ? "text-light-blue" : "text-white"
                      }`}
                    >
                      90 days
                    </Text>
                  </Ripple>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </>
  );
}
