import { createContext, useContext } from "react";

export const CurrentPathContext = createContext<any>(null);

export const useCurrentPath = () => useContext(CurrentPathContext);
