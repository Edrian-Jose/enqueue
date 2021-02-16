import Head from "next/head";
import Footer from "../app/components/modules/Footer/Footer";
import Navbar from "../app/components/modules/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Enqueue - Create Account</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <h1>Sign Up</h1>
      <Footer />
    </div>
  );
}
