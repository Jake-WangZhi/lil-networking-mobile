import { Info, X } from "phosphor-react-native";
import type { ReactElement } from "react";
import { useState } from "react";
import { View, Pressable } from "react-native";
import Ripple from "react-native-material-ripple";
import RNTooltip from "react-native-walkthrough-tooltip";
import { colors } from "@foundrymakes/tailwind-config";

interface Props {
  content: ReactElement;
}

export const Tooltip = ({ content }: Props) => {
  const [showTip, setTip] = useState(false);

  return (
    <RNTooltip
      disableShadow={true}
      backgroundColor="transparent"
      contentStyle={{ backgroundColor: colors["light-grey"], padding: 0 }}
      isVisible={showTip}
      content={
        <View className="flex-row p-4">
          <View className="w-[95%]">{content}</View>
          <View className="w-[5%] items-center">
            <Pressable
              className="bg-transparent w-4 h-4 p-0"
              onPress={() => setTip(false)}
            >
              <X color={colors.white} size={16} />
            </Pressable>
          </View>
        </View>
      }
      onClose={() => setTip(false)}
      placement="bottom"
    >
      <Ripple onPress={() => setTip(true)}>
        <Info color={colors.white} size={48} />
      </Ripple>
    </RNTooltip>
  );
};
