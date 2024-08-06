import type { ReactNode } from "react";
import { View, Text } from "react-native";
import Ripple from "react-native-material-ripple";

export const ContactButton = ({
  disabled = false,
  onPress,
  label,
  icon,
}: {
  disabled: boolean;
  onPress: () => void;
  label: string;
  icon: ReactNode;
}) => {
  return (
    <Ripple
      className="space-y-1 items-center p-1"
      disabled={disabled}
      onPress={onPress}
    >
      <View
        className={`${
          disabled ? "bg-dark-grey" : "bg-light-blue"
        } p-3 rounded-full items-center`}
      >
        {icon}
      </View>
      <Text className={`${disabled ? "text-disabled" : "text-white"} text-sm`}>
        {label}
      </Text>
    </Ripple>
  );
};
