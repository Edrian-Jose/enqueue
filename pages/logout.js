import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function logut() {
  const router = useRouter();

  useEffect(function () {
    router.push("/");
  }, []);
  return (
    <div>
      <Head>
        <title>Logging out</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
    </div>
  );
}
