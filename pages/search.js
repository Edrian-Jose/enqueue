import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import { useRouter } from "next/router";

export default function search() {
  const router = useRouter();
  const { q } = router.query;
  return (
    <div>
      <Head>
        <title>Enqueue</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <h1>Search {q}</h1>
      <Footer />
    </div>
  );
}
