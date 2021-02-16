import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";

export default function login() {
  return (
    <div>
      <Head>
        <title>Enqueue - Login</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <h1>Login</h1>
      <Footer />
    </div>
  );
}
