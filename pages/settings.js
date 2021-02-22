import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";

export default function Settings() {
  return (
    <div>
      <Head>
        <title>Enqueue - Settings</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <h1>Settings</h1>
      <Footer />
    </div>
  );
}
