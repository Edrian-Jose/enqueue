import "../app/styles/globals.css";
import { AppWrapper, useAppContext } from "../app/context/state";
import DialogContainer from "./../app/components/elements/DialogContainer/DialogContainer";
function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <DialogContainer />
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
