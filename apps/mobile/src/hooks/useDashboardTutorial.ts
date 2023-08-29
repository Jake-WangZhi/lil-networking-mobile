import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useDashboardTutorial = () => {
  const [hasViewedDashboardTutorial, setHasViewedDashboardTutorial] =
    useState<boolean>(true);

  useEffect(() => {
    pauseFor(3000)
      .then(async () => {
        const value = await AsyncStorage.getItem("@hasViewedDashboardTutorial");
        if (value !== "true") setHasViewedDashboardTutorial(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { hasViewedDashboardTutorial };
};

const pauseFor = async (milliseconds: number) =>
  await new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
