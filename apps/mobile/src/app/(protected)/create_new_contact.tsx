import { router } from "expo-router";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import Ripple from "react-native-material-ripple";
import { FieldArray, Formik } from "formik";
import { Warning, PlusCircle } from "phosphor-react-native";
import { useRef, useState } from "react";
import { z } from "zod";
import { useNewContactMutation } from "~/hooks/useNewContactMutation";
import { XCircle } from "phosphor-react-native";
import { linkedInUrlRegex, phoneRegex } from "~/utils/regex";
import { Loading } from "~/components/Loading";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { colors } from "@foundrymakes/tailwind-config";
import { FormikTextInput } from "~/components/FormikTextInput";
import { GoalDaysButton } from "~/components/GoalDaysButton";

const ValidationSchema = z.object({
  firstName: z.string({ required_error: "Required field" }),
  lastName: z.string().optional(),
  title: z.string().optional(),
  company: z.string().optional(),
  goalDays: z.number(),
  linkedInUrl: z
    .string()
    .regex(linkedInUrlRegex, "LinkedIn URLs must contain 'linkedin.com'")
    .optional(),
  email: z.string().email("Invalid Email").optional(),
  phone: z.string().regex(phoneRegex, "Invalid Phone Number").optional(),
  links: z.array(z.string().url("Invalid Link").optional()),
  tags: z.array(z.string().optional()),
  location: z.string().optional(),
});

export default function CreateNewContact() {
  const [focusedLinkIndex, setFocusedLinkIndex] = useState<number | null>(null);

  const [isTagsFocused, setIsTagsFocused] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);

  const {
    mutate: createNewContact,
    isLoading: isSaving,
    error,
  } = useNewContactMutation();

  if (isSaving) return <Loading />;

  return (
    <Formik
      initialValues={{
        firstName: undefined,
        lastName: undefined,
        title: undefined,
        company: undefined,
        goalDays: 30,
        linkedInUrl: undefined,
        email: undefined,
        phone: undefined,
        links: [],
        tags: [],
        location: undefined,
      }}
      validationSchema={toFormikValidationSchema(ValidationSchema)}
      onSubmit={(values) => {
        values.links = values.links.filter((item) => item !== "");
        values.tags = values.tags.filter((item) => item !== "");

        createNewContact(values, {
          onSuccess: ({ contactId }) => {
            router.push(`/profile/${contactId}`);
          },
        });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        setValues,
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
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >
            <View className="space-y-6 mt-4">
              {!!error && (
                <Text className="text-error">
                  Unable to create the contact, please try again later!
                </Text>
              )}
              <View className="space-y-4">
                <Text className="text-white text-xl font-semibold">
                  Primary Information
                </Text>

                <View>
                  <FormikTextInput
                    label="First"
                    name="firstName"
                    required
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                  />
                </View>

                <View>
                  <FormikTextInput
                    label="Last"
                    name="lastName"
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                  />
                </View>

                <View>
                  <FormikTextInput
                    label="Title"
                    name="title"
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                  />
                </View>

                <View>
                  <FormikTextInput
                    label="Company"
                    name="company"
                    onChangeText={handleChange("company")}
                    onBlur={handleBlur("company")}
                  />
                </View>

                <View className="flex-row items-center space-x-2">
                  <Text className="text-white text-base w-[82]">
                    Reminder *
                  </Text>
                  <View className="flex-row space-x-2">
                    <GoalDaysButton
                      onPress={async () => {
                        await setValues({
                          ...values,
                          goalDays: 30,
                        });
                      }}
                      goalDaysValue={values.goalDays}
                      buttonValue={30}
                    />
                    <GoalDaysButton
                      onPress={async () => {
                        await setValues({
                          ...values,
                          goalDays: 60,
                        });
                      }}
                      goalDaysValue={values.goalDays}
                      buttonValue={60}
                    />
                    <GoalDaysButton
                      onPress={async () => {
                        await setValues({
                          ...values,
                          goalDays: 90,
                        });
                      }}
                      goalDaysValue={values.goalDays}
                      buttonValue={90}
                    />
                  </View>
                </View>
              </View>

              <View className="space-y-4">
                <Text className="text-white text-xl font-semibold">
                  Contact Information
                </Text>

                <View>
                  <FormikTextInput
                    label="LinkedIn"
                    name="linkedInUrl"
                    onChangeText={handleChange("linkedInUrl")}
                    onBlur={handleBlur("linkedInUrl")}
                  />
                </View>

                <View>
                  <FormikTextInput
                    label="Email"
                    name="email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                </View>

                <View>
                  <FormikTextInput
                    label="Phone"
                    name="phone"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                  />
                </View>

                <View>
                  <FieldArray name="links">
                    {({ push }: { push: (value: string) => void }) => (
                      <View className="space-y-4">
                        {values.links.length > 0 &&
                          values.links.map((_link, index) => (
                            <View key={index} className="space-y-1">
                              <View className="flex-row items-center space-x-2">
                                <Text className="text-white text-base w-[74]">
                                  {`Link ${index + 1}`}
                                </Text>
                                <TextInput
                                  className={`bg-dark-grey h-12 flex-1 text-white p-2 ${
                                    (focusedLinkIndex === index &&
                                      "border border-white rounded") ||
                                    (errors.links?.[index] &&
                                      "border border-error rounded")
                                  }`}
                                  onChangeText={handleChange(`links.${index}`)}
                                  onBlur={handleBlur(`links.${index}`)}
                                  value={values.links[index]}
                                  selectionColor={colors.white}
                                  onEndEditing={() => setFocusedLinkIndex(null)}
                                  onFocus={() => setFocusedLinkIndex(index)}
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                />
                              </View>
                              {touched.links && errors.links?.[index] && (
                                <View className="flex-row items-center space-x-2">
                                  <Text className="text-white text-base w-[74]" />
                                  <View className="flex-row items-center space-x-1">
                                    <Warning
                                      color={colors.error}
                                      size={16}
                                      weight="fill"
                                    />
                                    <Text className="text-error text-xs">
                                      {errors.links?.[index]}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </View>
                          ))}
                        <View className="flex-row justify-end">
                          <Ripple
                            onPress={() => push("")}
                            className="flex-row items-center space-x-1"
                          >
                            <PlusCircle
                              size={24}
                              color={colors["light-blue"]}
                            />
                            <Text className="text-light-blue">Add Link</Text>
                          </Ripple>
                        </View>
                      </View>
                    )}
                  </FieldArray>
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
                    inputRef.current?.focus();
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
                    value={tagsInput}
                    placeholder={
                      tags.length !== 0 ? "" : "Type interest here..."
                    }
                    placeholderTextColor="rgba(255, 255, 255, 0.70)"
                    selectionColor={colors.white}
                    onKeyPress={(e) => {
                      const { key } = e.nativeEvent;

                      if (
                        key === "Backspace" &&
                        !tagsInput.length &&
                        tags.length
                      ) {
                        e.preventDefault();
                        const tagsCopy = [...tags];
                        tagsCopy.pop();

                        setTags(tagsCopy);
                      }
                    }}
                    onChangeText={setTagsInput}
                    onFocus={() => setIsTagsFocused(true)}
                    onEndEditing={() => {
                      const trimmedInput = tagsInput.trim();

                      if (trimmedInput.length) {
                        setTagsInput("");
                        setTags((prevTags) => [...prevTags, trimmedInput]);
                      }

                      setIsTagsFocused(false);
                    }}
                    autoCorrect={false}
                    autoCapitalize="none"
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
                <View className="mt-4 mb-12">
                  <FormikTextInput
                    name="location"
                    placeholder="Add where you met here..."
                    placeholderTextColor="rgba(255, 255, 255, 0.70)"
                    multiline={true}
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
