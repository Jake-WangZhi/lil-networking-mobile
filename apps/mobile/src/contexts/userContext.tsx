import { ReactNode, createContext, useContext } from "react";
import { useUser } from "@clerk/clerk-expo";
import { UserResource } from "@clerk/types";

const UserContext = createContext<{ user: UserResource | null | undefined }>({
  user: null,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { user } = useUser(); // Retrieve the user data from Clerk.js

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
