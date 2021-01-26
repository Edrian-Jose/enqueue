import Head from "next/head";
import Footer from "../app/components/modules/Footer/Footer";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Slider from "../app/components/modules/Slider/Slider";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Enqueue - Scheduling made easy</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <Slider />
      <Footer />
    </div>
  );
}
