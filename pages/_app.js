import "../app/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AppWrapper, useAppContext } from "../app/context/state";
import DialogContainer from "./../app/components/elements/DialogContainer/DialogContainer";
import { ToastContainer } from "react-toastify";
function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <DialogContainer />
      <ToastContainer />
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
