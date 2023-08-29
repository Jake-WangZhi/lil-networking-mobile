import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useCollapsibleStatus = () => {
  const [isPriorityCollapsed, setIsPriorityCollapsed] = useState(false);
  const [isUpcomingCollapsed, setIsUpcomingCollapsed] = useState(false);

  const loadPriorityCollapseSetting = async () => {
    try {
      const value = await AsyncStorage.getItem("@isPriorityCollapsed");
      setIsPriorityCollapsed(value === "true");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadUpcomingCollapseSetting = async () => {
    try {
      const value = await AsyncStorage.getItem("@isUpcomingCollapsed");
      setIsUpcomingCollapsed(value === "true");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    void loadPriorityCollapseSetting();
    void loadUpcomingCollapseSetting();
  }, []);

  return {
    isPriorityCollapsed,
    isUpcomingCollapsed,
    togglePriorityCollapse: async () => {
      await AsyncStorage.setItem(
        "@isPriorityCollapsed",
        `${!isPriorityCollapsed}`
      );
      setIsPriorityCollapsed(!isPriorityCollapsed);
    },
    toggleUpcomingCollapse: async () => {
      await AsyncStorage.setItem(
        "@isUpcomingCollapsed",
        `${!isUpcomingCollapsed}`
      );
      setIsUpcomingCollapsed(!isUpcomingCollapsed);
    },
  };
};
