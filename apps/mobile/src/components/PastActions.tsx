import { ActionTypeConstants } from "@foundrymakes/validation";
import type { Action } from "@foundrymakes/validation";
import { CaretDown, CaretUp } from "phosphor-react-native";
import { View, FlatList, Text } from "react-native";
import Collapsible from "react-native-collapsible";
import Ripple from "react-native-material-ripple";
import { ActionCard } from "./ActionCard";
import { useCollapsibleStatus } from "~/hooks/useCollapsibleStatus";

export const PastActions = ({ actions }: { actions: Action[] }) => {
  const { isPriorityCollapsed, togglePriorityCollapse } =
    useCollapsibleStatus();

  return (
    <>
      <Ripple
        onPress={togglePriorityCollapse}
        className="py-3 mt-3 flex-row justify-between items-center"
      >
        <View className="flex-row items-center space-x-2">
          <View className="bg-magenta w-1 h-4"></View>
          <Text className="text-white text-xl font-semibold">{`Priority (${actions.length})`}</Text>
        </View>
        {isPriorityCollapsed ? (
          <CaretDown size={24} color="white" />
        ) : (
          <CaretUp size={24} color="white" />
        )}
      </Ripple>
      <Collapsible collapsed={isPriorityCollapsed}>
        <FlatList
          data={actions}
          renderItem={({ item }: { item: Action }) => (
            <ActionCard action={item} actionType={ActionTypeConstants.PAST} />
          )}
          keyExtractor={(item) => item.contactId}
          scrollEnabled={false}
        />
      </Collapsible>
    </>
  );
};
