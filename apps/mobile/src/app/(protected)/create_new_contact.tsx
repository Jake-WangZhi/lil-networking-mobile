import { router } from "expo-router";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import Ripple from "react-native-material-ripple";
import { Formik } from "formik";
import { Warning, PlusCircle } from "phosphor-react-native";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useNewContactMutation } from "~/hooks/useNewContactMutation";
import { XCircle } from "phosphor-react-native";
import { linkedInUrlRegex, phoneRegex, urlRegex } from "~/utils/regex";
import { Loading } from "~/components/Loading";

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string(),
  title: Yup.string(),
  company: Yup.string(),
  goalDays: Yup.number().required(),
  linkedIn: Yup.string().matches(linkedInUrlRegex),
  email: Yup.string().email(),
  phone: Yup.string().matches(phoneRegex),
  links: Yup.array().of(Yup.string().matches(urlRegex)),
  tags: Yup.array(),
  location: Yup.string(),
});

export default function CreateNewContact() {
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isCompanyFocused, setIsCompanyFocused] = useState(false);
  const [isLinkedInFocused, setIsLinkedInFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isTagsFocused, setIsTagsFocused] = useState(false);

  const [selectedDays, setSelectedDays] = useState(30);

  const [links, setLinks] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);

  const [isSaving, setIsSaving] = useState(false);

  const postNewContactMutation = useNewContactMutation({
    onSuccess: () => {
      setIsSaving(false);
      router.push("/dashboard");
    },
    onError: (error) => {
      setIsSaving(false);
      console.log(error);
    },
  });

  if (isSaving) return <Loading />;

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        title: "",
        company: "",
        goalDays: 30,
        linkedIn: "",
        email: "",
        phone: "",
        links: [""],
        tags: [""],
        location: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        setIsSaving(true);

        values.links = values.links.filter((item) => item !== "");
        values.tags = values.tags.filter((item) => item !== "");

        postNewContactMutation.mutate(values);
      }}
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
            <View className="flex-1 flex-row justify-end">
              <Ripple
                onPress={() => handleSubmit()}
                className="py-3"
                disabled={isSaving}
              >
                <Text className="text-light-blue text-base font-semibold">
                  Save
                </Text>
              </Ripple>
            </View>
          </View>
          <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View className="space-y-6 mt-4">
              <View className="space-y-4">
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
                    className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                      isLastNameFocused && "border border-white rounded"
                    }`}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    selectionColor="white"
                    onFocus={() => setIsLastNameFocused(true)}
                    onEndEditing={() => setIsLastNameFocused(false)}
                  />
                </View>

                <View className="flex-row items-center space-x-2">
                  <Text className="text-white text-base w-[74]">Title</Text>
                  <TextInput
                    className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                      isTitleFocused && "border border-white rounded"
                    }`}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                    selectionColor="white"
                    onFocus={() => setIsTitleFocused(true)}
                    onEndEditing={() => setIsTitleFocused(false)}
                  />
                </View>

                <View className="flex-row items-center space-x-2">
                  <Text className="text-white text-base w-[74]">Company</Text>
                  <TextInput
                    className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                      isCompanyFocused && "border border-white rounded"
                    }`}
                    onChangeText={handleChange("company")}
                    onBlur={handleBlur("company")}
                    value={values.company}
                    selectionColor="white"
                    onFocus={() => setIsCompanyFocused(true)}
                    onEndEditing={() => setIsCompanyFocused(false)}
                  />
                </View>

                <View className="flex-row items-center space-x-2">
                  <Text className="text-white text-base w-[82]">
                    Reminder *
                  </Text>
                  <View className="flex-row space-x-2">
                    <Ripple
                      className={`bg-dark-grey rounded-full ${
                        selectedDays === 30 && "border border-light-blue"
                      }`}
                      onPress={() => {
                        setSelectedDays(30);
                        values.goalDays = 30;
                      }}
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
                      onPress={() => {
                        setSelectedDays(60);
                        values.goalDays = 60;
                      }}
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
                      onPress={() => {
                        setSelectedDays(90);
                        values.goalDays = 90;
                      }}
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

              <View className="space-y-4">
                <Text className="text-white text-xl font-semibold">
                  Contact Information
                </Text>
                <View className="space-y-1">
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-white text-base w-[74]">
                      LinkedIn
                    </Text>
                    <TextInput
                      className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                        (isLinkedInFocused && "border border-white rounded") ||
                        (errors.linkedIn && "border border-error rounded")
                      }`}
                      onChangeText={handleChange("linkedIn")}
                      onBlur={handleBlur("linkedIn")}
                      value={values.linkedIn}
                      selectionColor="white"
                      onFocus={() => setIsLinkedInFocused(true)}
                      onEndEditing={() => setIsLinkedInFocused(false)}
                    />
                  </View>
                  {touched.linkedIn && errors.linkedIn && (
                    <View className="flex-row items-center space-x-2">
                      <Text className="text-white text-base w-[74]" />
                      <View className="flex-row items-center space-x-1">
                        <Warning color="#FB5913" size={16} weight="fill" />
                        <Text className="text-error">Invalid entry</Text>
                      </View>
                    </View>
                  )}
                </View>

                <View className="space-y-1">
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-white text-base w-[74]">Email</Text>
                    <TextInput
                      className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                        (isEmailFocused && "border border-white rounded") ||
                        (errors.email && "border border-error rounded")
                      }`}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      selectionColor="white"
                      onFocus={() => setIsEmailFocused(true)}
                      onEndEditing={() => setIsEmailFocused(false)}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <View className="flex-row items-center space-x-2">
                      <Text className="text-white text-base w-[74]" />
                      <View className="flex-row items-center space-x-1">
                        <Warning color="#FB5913" size={16} weight="fill" />
                        <Text className="text-error">Invalid entry</Text>
                      </View>
                    </View>
                  )}
                </View>

                <View className="space-y-1">
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-white text-base w-[74]">Phone</Text>
                    <TextInput
                      className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                        (isPhoneFocused && "border border-white rounded") ||
                        (errors.phone && "border border-error rounded")
                      }`}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                      selectionColor="white"
                      onFocus={() => setIsPhoneFocused(true)}
                      onEndEditing={() => setIsPhoneFocused(false)}
                    />
                  </View>
                  {touched.phone && errors.phone && (
                    <View className="flex-row items-center space-x-2">
                      <Text className="text-white text-base w-[74]" />
                      <View className="flex-row items-center space-x-1">
                        <Warning color="#FB5913" size={16} weight="fill" />
                        <Text className="text-error">Invalid entry</Text>
                      </View>
                    </View>
                  )}
                </View>

                {links.map((link, index) => (
                  <View key={index} className="space-y-1">
                    <View className="flex-row items-center space-x-2">
                      <Text className="text-white text-base w-[74]">
                        {`Link ${index + 1}`}
                      </Text>
                      <TextInput
                        className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                          (focusedIndex === index &&
                            "border border-white rounded") ||
                          (errors.links?.[index] &&
                            "border border-error rounded")
                        }`}
                        onChangeText={(value) => {
                          setLinks((prevLinks) => {
                            const updatedLinks = [...prevLinks];
                            updatedLinks[index] = value;
                            return updatedLinks;
                          });
                        }}
                        onBlur={handleBlur("links")}
                        value={links[index]}
                        selectionColor="white"
                        onEndEditing={() => {
                          values.links = links;
                          setFocusedIndex(null);
                        }}
                        onFocus={() => setFocusedIndex(index)}
                      />
                    </View>
                    {touched.links && errors.links?.[index] && (
                      <View className="flex-row items-center space-x-2">
                        <Text className="text-white text-base w-[74]" />
                        <View className="flex-row items-center space-x-1">
                          <Warning color="#FB5913" size={16} weight="fill" />
                          <Text className="text-error">Invalid entry</Text>
                        </View>
                      </View>
                    )}
                  </View>
                ))}

                <View className="flex-row justify-end">
                  <Ripple
                    onPress={() => {
                      setLinks((prevLinks) => [...prevLinks, ""]);
                    }}
                    className="flex-row items-center space-x-1"
                  >
                    <PlusCircle size={24} color="#38ACE2" />
                    <Text className="text-light-blue">Add Link</Text>
                  </Ripple>
                </View>
              </View>

              <View>
                <Text className="text-white text-xl font-semibold">Tags</Text>
                <Text className="text-white text-base mt-3">
                  Add tags to remember important details
                </Text>
                <Text className="text-white text-sm">
                  Interests, Industries, notes, priorities, etc.
                </Text>
                <Pressable
                  className={`flex-row items-center flex-wrap space-x-4 space-y-2 mt-4 bg-dark-grey p-4 min-h-[64] ${
                    isTagsFocused && "border border-white rounded"
                  }`}
                  onPress={() => {
                    inputRef.current?.focus(); // Safely focus on the input again if it exists
                  }}
                >
                  {tags.map((tag, index) => (
                    <View
                      key={index}
                      className="px-4 py-[6] bg-light-grey rounded-full flex-row space-x-1"
                    >
                      <Text className="text-white">{tag}</Text>
                      <Ripple
                        onPress={() => {
                          setTags((prevState) =>
                            prevState.filter((tag, i) => i !== index)
                          );
                        }}
                      >
                        <XCircle
                          size={18}
                          weight="fill"
                          color="rgba(255, 255, 255, 0.6)"
                        />
                      </Ripple>
                    </View>
                  ))}
                  <TextInput
                    ref={inputRef}
                    className="text-white"
                    value={input}
                    placeholder={
                      tags.length !== 0 ? "" : "Type interest here..."
                    }
                    placeholderTextColor="rgba(255, 255, 255, 0.70)"
                    selectionColor="white"
                    onKeyPress={(e) => {
                      const { key } = e.nativeEvent;

                      if (key === "Backspace" && !input.length && tags.length) {
                        e.preventDefault();
                        const tagsCopy = [...tags];
                        tagsCopy.pop();

                        setTags(tagsCopy);
                      }
                    }}
                    onChangeText={setInput}
                    onFocus={() => setIsTagsFocused(true)}
                    onEndEditing={() => {
                      const trimmedInput = input.trim();

                      if (trimmedInput.length) {
                        setInput("");
                        setTags((prevTags) => [...prevTags, trimmedInput]);
                      }

                      setIsTagsFocused(false);
                      values.tags = tags;
                    }}
                  />
                </Pressable>
              </View>

              <View>
                <Text className="text-white text-xl font-semibold">
                  History
                </Text>
                <Text className="text-white text-base mt-3">
                  How did you meet?
                </Text>
                <Text className="text-white text-sm">
                  Never forget where you met a contact again
                </Text>
                <View
                  className={`bg-dark-grey min-h-[64] flex-1 p-4 mt-4 mb-12 ${
                    isLocationFocused && "border border-white rounded"
                  }`}
                >
                  <TextInput
                    className="text-white"
                    onChangeText={handleChange("location")}
                    onBlur={handleBlur("location")}
                    value={values.location}
                    selectionColor="white"
                    placeholder="Add where you met here..."
                    placeholderTextColor="rgba(255, 255, 255, 0.70)"
                    onFocus={() => setIsLocationFocused(true)}
                    onEndEditing={() => setIsLocationFocused(false)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </Formik>
  );
}
