import React from "react";

export default function AppLogo() {
  const appLogoStyle = {
    width: "6.3125rem",
    height: "6.3125rem",
  };

  const appNameStyle = {
    fontSize: "1.6875rem",
    fontFamily: "Raleway-Bold",
    margin: "auto",
    textIndent: "1.125rem",
  };
  return (
    <React.Fragment>
      <img src="/favicon.svg" alt="App Logo" style={appLogoStyle} />
      <span style={appNameStyle}>EnQueue</span>
    </React.Fragment>
  );
}
