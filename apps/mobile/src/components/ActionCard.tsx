import Ripple from "react-native-material-ripple";
import type { Action } from "~/types";
import { ActionType } from "~/types";
import { Text, View } from "react-native";
import { CalendarBlank } from "phosphor-react-native";
import { Link } from "expo-router";

interface Props {
  action: Action;
  actionType: ActionType;
}

export const ActionCard = ({ action, actionType }: Props) => {
  const {
    contactFirstName,
    contactLastName,
    days,
    goalDays,
    title,
    isNewUser,
    contactId,
  } = action;

  return (
    <Link href={`/profile/${contactId}`} asChild>
      <Ripple className="bg-dark-grey p-4 rounded-lg mb-4 space-y-2">
        <View>
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-base font-semibold">
              {contactFirstName} {contactLastName}
            </Text>
            {isNewUser && (
              <Text
                className={`${
                  actionType === ActionType.Past
                    ? "text-magenta"
                    : "text-light-yellow"
                } text-sm font-semibold`}
              >
                New!
              </Text>
            )}
          </View>
          {title && (
            <Text className="text-white text-sm opacity-70">{title}</Text>
          )}
        </View>
        <View className="flex-row space-x-2">
          <CalendarBlank size={24} color="white" />
          <View className="flex-row items-center">
            <Text className="text-white text-sm">
              {goalDays} days •{" "}
              <Text
                className={`${
                  actionType === ActionType.Past
                    ? "text-magenta"
                    : "text-light-yellow"
                }`}
              >{`Last Activity: ${days} days ago`}</Text>
            </Text>
          </View>
        </View>
      </Ripple>
    </Link>
  );
};
