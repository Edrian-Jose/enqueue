import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [sharedState, setSharedState] = useState({
    user: null,
    dialog: {
      state: "closed",
      content: <p>Hello</p>,
      title: "Title to",
    },
  });

  const methods = {
    setUser: (u) => {
      let tempState = { ...sharedState };
      tempState.user = u;
      setSharedState(tempState);
    },
    setState: (open) => {
      let scrolling = "auto";
      open ? (scrolling = "hidden") : (scrolling = "auto");
      document.body.style.overflowY = scrolling;
      let tempState = { ...sharedState };
      tempState.dialog.state = open ? "open" : "closed";
      setSharedState(tempState);
    },
    setContent: (el) => {
      let tempState = { ...sharedState };
      tempState.dialog.content = el;
      setSharedState(tempState);
    },
    setTitle: (title) => {
      let tempState = { ...sharedState };
      tempState.dialog.title = title;
      setSharedState(tempState);
    },
  };

  return (
    <AppContext.Provider value={{ sharedState, setSharedState, methods }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
