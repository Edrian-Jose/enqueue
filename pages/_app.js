import "../app/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AppWrapper, useAppContext } from "../app/context/state";
import DialogContainer from "./../app/components/elements/DialogContainer/DialogContainer";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "nprogress/nprogress.css";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => NProgress.done();

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);
    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  }, []);

  return (
    <AppWrapper>
      <DialogContainer />
      <ToastContainer />
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
