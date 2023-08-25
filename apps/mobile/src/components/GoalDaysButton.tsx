import { Text } from "react-native";
import Ripple from "react-native-material-ripple";

export const GoalDaysButton = ({
  buttonValue,
  goalDaysValue,
  onPress,
}: {
  buttonValue: number;
  goalDaysValue: number;
  onPress: () => void;
}) => {
  return (
    <Ripple
      className={`bg-dark-grey rounded-full ${
        goalDaysValue === buttonValue && "border border-light-blue"
      }`}
      onPress={onPress}
    >
      <Text
        className={`text-sm px-4 py-2 ${
          goalDaysValue === buttonValue ? "text-light-blue" : "text-white"
        }`}
      >
        {buttonValue} days
      </Text>
    </Ripple>
  );
};
