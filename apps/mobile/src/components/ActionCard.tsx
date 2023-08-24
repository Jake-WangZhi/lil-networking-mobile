import Ripple from "react-native-material-ripple";
import type { Action } from "~/types";
import { ActionType } from "~/types";
import { Text, View } from "react-native";
import { CalendarBlank } from "phosphor-react-native";

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
    contactCreatedAt,
  } = action;
  return (
    <Ripple className="bg-dark-grey p-4 rounded-lg mb-4 space-y-2">
      <View>
        <Text className="text-white text-base font-semibold">
          {contactFirstName} {contactLastName}
        </Text>
        {title && (
          <Text className="text-white text-sm opacity-70">{title}</Text>
        )}
      </View>
      <View className="flex-row space-x-2">
        <CalendarBlank size={24} color="white" />
        <View className="flex-row items-center">
          <Text className="text-white text-sm">{goalDays} days</Text>
          {!contactCreatedAt && (
            <View className="flex-row items-center">
              <Text className="text-white"> • </Text>
              <Text
                className={`${
                  actionType === ActionType.Past
                    ? "text-magenta"
                    : "text-light-yellow"
                }`}
              >{`Last Activity: ${days} days ago`}</Text>
            </View>
          )}
        </View>
      </View>
    </Ripple>
  );
};
