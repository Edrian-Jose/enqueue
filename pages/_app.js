import "../app/styles/globals.css";
import { AppWrapper } from "../app/context/state";
function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
