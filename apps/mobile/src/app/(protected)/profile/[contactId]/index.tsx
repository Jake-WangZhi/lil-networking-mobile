import { router } from "expo-router";
import { Text, View, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Ripple from "react-native-material-ripple";
import { useContact } from "~/hooks/useContact";
import { Loading } from "~/components/Loading";
import {
  X,
  Link,
  LinkedinLogo,
  Envelope,
  ChatCircle,
  Phone,
} from "phosphor-react-native";
import { colors } from "@foundrymakes/tailwind-config";

export default function Profile() {
  const { contactId } = useLocalSearchParams<{ contactId: string }>();
  const { data: contact, isLoading, error } = useContact(contactId ?? "");

  if (isLoading) {
    return <Loading />;
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
  } = contact;

  return (
    <View>
      <View className="flex-row justify-between">
        <Ripple onPress={() => router.back()}>
          <X size={32} color={colors.white} />
        </Ripple>
      </View>
      {!!error && (
        <Text className="text-white">{JSON.stringify(error, null, 2)}</Text>
      )}
      <View className="space-y-6 mt-2">
        <View className="bg-dark-grey rounded-lg p-4 space-y-[6]">
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
              <Link size={16} color={colors["light-blue"]} />
              <Text className="text-light-blue text-base truncate line-clamp-1">
                {link}
              </Text>
            </Ripple>
          ))}
        </View>
        <View className="space-y-2">
          <Text className="text-white text-xl font-semibold">Connect</Text>
          <View className="flex-row justify-between">
            {linkedInUrl && (
              <Ripple
                className="space-y-1 items-center"
                onPress={() => Linking.openURL(linkedInUrl)}
              >
                <View className="bg-light-blue p-4 rounded-full items-center">
                  <LinkedinLogo size={24} />
                </View>
                <Text className="text-white text-sm">LinkedIn</Text>
              </Ripple>
            )}
            {email && (
              <Ripple
                className="space-y-1 items-center"
                onPress={() => Linking.openURL(`mailto:${email}`)}
              >
                <View className="bg-light-blue p-4 rounded-full items-center">
                  <Envelope size={24} />
                </View>
                <Text className="text-white text-sm">Email</Text>
              </Ripple>
            )}
            {phone && (
              <>
                <Ripple
                  className="space-y-1 items-center"
                  onPress={() => Linking.openURL(`sms:${phone}`)}
                >
                  <View className="bg-light-blue p-4 rounded-full items-center">
                    <ChatCircle size={24} />
                  </View>
                  <Text className="text-white text-sm">Message</Text>
                </Ripple>
                <Ripple
                  className="space-y-1 items-center"
                  onPress={() => Linking.openURL(`tel:${phone}`)}
                >
                  <View className="bg-light-blue p-4 rounded-full items-center">
                    <Phone size={24} />
                  </View>
                  <Text className="text-white text-sm">Phone</Text>
                </Ripple>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
