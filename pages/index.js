import Head from "next/head";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Enqueue - Scheduling made easy</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
    </div>
  );
}
