import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useTutorial = (name: string) => {
  const [hasViewedTutorial, setHasViewedTutorial] = useState<boolean>(true);

  useEffect(() => {
    pauseFor(3000)
      .then(async () => {
        const value = await AsyncStorage.getItem(name);
        if (value !== "true") setHasViewedTutorial(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name]);

  return { hasViewedTutorial };
};

const pauseFor = async (milliseconds: number) =>
  await new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
