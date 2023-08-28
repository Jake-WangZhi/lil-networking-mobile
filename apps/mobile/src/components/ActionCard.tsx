import Ripple from "react-native-material-ripple";
import { ActionType } from "~/types";
import { Text, View } from "react-native";
import { CalendarBlank } from "phosphor-react-native";
import type { Action } from "@foundrymakes/validation";

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
  } = action;

  return (
    <Ripple className="bg-dark-grey p-4 rounded-lg mb-4 space-y-2">
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-base font-semibold">
            {contactFirstName} {contactLastName}
          </Text>
          {isNewUser && (
            <View className="bg-light-grey px-4 py-2 rounded-3xl">
              <Text className="text-white text-sm font-semibold">New</Text>
            </View>
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
            {goalDays} days &bull;&nbsp;
            <Text
              className={`${
                actionType === ActionType.PAST
                  ? "text-magenta"
                  : "text-light-yellow"
              }`}
            >{`Last Activity: ${days} days ago`}</Text>
          </Text>
        </View>
      </View>
    </Ripple>
  );
};
