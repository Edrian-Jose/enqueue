import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";

export default function logut() {
  return (
    <div>
      <Head>
        <title>Logging out</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <h1>Logout</h1>
      <Footer />
    </div>
  );
}
