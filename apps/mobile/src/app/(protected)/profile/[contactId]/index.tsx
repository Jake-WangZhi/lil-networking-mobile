import { router } from "expo-router";
import { Text, View, Linking, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Ripple from "react-native-material-ripple";
import { useContact } from "~/hooks/useContact";
import { Loading } from "~/components/Loading";
import {
  X,
  Link as LinkIcon,
  LinkedinLogo,
  Envelope,
  ChatCircle,
  Phone,
} from "phosphor-react-native";
import { colors } from "@foundrymakes/tailwind-config";
import { Error } from "~/components/Error";
import { useTutorial } from "~/hooks/useTutorial";
import { ProfileTutorialModal } from "~/components/ProfileTutorialModal";
import { ContactButton } from "~/components/ContactButton";

export default function Profile() {
  const { contactId } = useLocalSearchParams<{ contactId: string }>();
  const { data: contact, isLoading, error } = useContact(contactId ?? "");
  const { hasViewedTutorial } = useTutorial("@hasViewedProfileTutorial");

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!contact) return null;

  const {
    firstName,
    lastName,
    title,
    company,
    links,
    linkedInUrl,
    email,
    phone,
    tags,
  } = contact;

  return (
    <>
      <View>
        <View className="flex-row justify-between mx-4">
          <Ripple onPress={() => router.back()}>
            <X size={32} color={colors.white} />
          </Ripple>
        </View>

        <View className="space-y-6 mt-2">
          <View className="bg-dark-grey rounded-lg p-4 space-y-[6] mx-4">
            <Text className="text-white text-2xl font-semibold">
              {firstName} {lastName}
            </Text>
            {title && (
              <Text className="text-supporting-text text-base">{title}</Text>
            )}
            {company && (
              <Text className="text-supporting-text text-base">{company}</Text>
            )}
            {links.map((link, index) => (
              <Ripple
                key={index}
                onPress={() => Linking.openURL(link)}
                className="flex-row items-center space-x-2"
              >
                <LinkIcon size={16} color={colors["light-blue"]} />
                <Text className="text-light-blue text-base">
                  {new URL(link).hostname}
                </Text>
              </Ripple>
            ))}
          </View>
          <View className="space-y-2 mx-4">
            <Text className="text-white text-xl font-semibold">Connect</Text>
            <View className="flex-row justify-between">
              <ContactButton
                disabled={!linkedInUrl}
                onPress={() => linkedInUrl && Linking.openURL(linkedInUrl)}
                icon={
                  <LinkedinLogo
                    size={24}
                    color={linkedInUrl ? colors["dark-blue"] : colors.disabled}
                  />
                }
                label="LinkedIn"
              />

              <ContactButton
                disabled={!email}
                onPress={() => email && Linking.openURL(email)}
                icon={
                  <Envelope
                    size={24}
                    color={email ? colors["dark-blue"] : colors.disabled}
                  />
                }
                label="Email"
              />

              <ContactButton
                disabled={!phone}
                onPress={() => phone && Linking.openURL(`sms:${phone}`)}
                icon={
                  <ChatCircle
                    size={24}
                    color={phone ? colors["dark-blue"] : colors.disabled}
                  />
                }
                label="Message"
              />

              <ContactButton
                disabled={!phone}
                onPress={() => phone && Linking.openURL(`tel:${phone}`)}
                icon={
                  <Phone
                    size={24}
                    color={phone ? colors["dark-blue"] : colors.disabled}
                  />
                }
                label="Phone"
              />
            </View>
          </View>

          <View className="space-y-3">
            <Text className="text-white text-xl font-semibold mx-4">Tags</Text>
            <FlatList
              data={tags}
              renderItem={({
                item,
                index,
              }: {
                item: string;
                index: number;
              }) => (
                <View
                  className={`bg-dark-grey rounded-2xl px-4 py-[6] ${
                    index === 0 ? "ml-4" : "ml-2"
                  }`}
                >
                  <Text className="text-white">{item}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              horizontal
              className="py-2"
            />
          </View>
        </View>
      </View>
      {!hasViewedTutorial && <ProfileTutorialModal />}
    </>
  );
}
