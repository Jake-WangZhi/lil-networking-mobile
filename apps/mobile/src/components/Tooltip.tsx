import { Button } from "gluestack-ui";
import { Info, X } from "phosphor-react-native";
import { ReactElement, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import RNTooltip from "react-native-walkthrough-tooltip";

interface Props {
  content: ReactElement;
}

export const Tooltip = ({ content }: Props) => {
  const [showTip, setTip] = useState(false);

  return (
    <RNTooltip
      backgroundColor="transparent"
      contentStyle={{ backgroundColor: "#0F1A24", padding: 0 }}
      arrowStyle={{
        backgroundColor: "#0F1A24",
        borderTopColor: "rgba(255, 255, 255, 0.16)",
      }}
      isVisible={showTip}
      content={
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.16)",
            padding: 16,
            flexDirection: "row",
            gap: 8,
          }}
        >
          {content}
          <View>
            <Button
              className="bg-transparent w-4 h-4 p-0"
              onPress={() => setTip(false)}
            >
              <X color="white" size={16} />
            </Button>
          </View>
        </View>
      }
      onClose={() => setTip(false)}
      placement="bottom"
    >
      <TouchableOpacity onPress={() => setTip(true)}>
        <Info color="white" size={48} />
      </TouchableOpacity>
    </RNTooltip>
  );
};
