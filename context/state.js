import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  let sharedState = {
    name: "edrian",
    service: "blahblah",
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
