import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [sharedState, setSharedState] = useState({
    dialog: {
      state: "closed",
      content: <p>Hello</p>,
      title: "Title to",
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
      setDialog: (state) => setSharedState(state),
    },
  });

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
