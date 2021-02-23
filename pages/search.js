import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import { useRouter } from "next/router";
import ServiceCard from "./../app/components/modules/ServiceCard/ServiceCard";
import Link from "next/link";
import { http } from "../app/utils/apiMethods";
import { server } from "./../app/utils/config";

function search({ services }) {
  if (!services) {
    services = [];
  }
  const sortedServices = services.sort((a, b) => {
    return a.rating * a.reviewCount - b.rating * b.reviewCount;
  });

  const serviceCards = sortedServices.map((service) => {
    return (
      <Link href={"/service/" + service._id} key={service._id}>
        <a>
          <ServiceCard service={service} />
        </a>
      </Link>
    );
  });

  return (
    <div>
      <Head>
        <title>Enqueue</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <div className="px-20">{serviceCards}</div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API

  let services = null;
  await http("GET", `${server}/api/services?q=${context.query.q}`)
    .then((d) => (services = d.data))
    .catch((e) => console.error(e));

  // Pass data to the page via props
  return { props: { services } };
}

export default search;
