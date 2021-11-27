import React, { useEffect, useState } from "react";
import { User } from "interfaces/User.interface";

export interface AppContextConfig {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isEntering: boolean;
  setIsEntering: React.Dispatch<React.SetStateAction<User | boolean>>;
}

export const AppContext = React.createContext<AppContextConfig>({} as AppContextConfig);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isEntering, setIsEntering] = useState<boolean>(false);

  useEffect(() => {
    if (!window) return;
    const storedUser = window.localStorage.getItem("user");
    if (!user && storedUser) {
      const parsedStoredUser = JSON.parse(storedUser);
      setUser(parsedStoredUser);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, isEntering, setIsEntering }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
