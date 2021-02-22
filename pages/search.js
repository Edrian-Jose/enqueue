import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import { useRouter } from "next/router";
import ServiceCard from "./../app/components/modules/ServiceCard/ServiceCard";
import Link from "next/link";

export default function search() {
  const router = useRouter();
  const { q } = router.query;
  const services = [
    {
      id: "xAdq1",
      name: "Remudaro Boongaling Dental Clinic",
      rating: 3.7,
      reviewCount: 59,
      type: "Dental Clinic",
      address: "1, J.P Rizal Avenue, Manggahan",
      time: "8:00 AM -11:00 AM, 12:00PM - 5:00 PM",
    },
    {
      id: "xAdq2",
      name: "Blang Blang Dental Clinic",
      rating: 4.7,
      reviewCount: 5,
      type: "Dental Clinic",
      address: "1, J.P Rizal Avenue, Manggahan",
      time: "8:00 AM -11:00 AM, 12:00PM - 5:00 PM",
    },
    {
      id: "xAdq3",
      name: "Super Dental Clinic",
      rating: 4.7,
      reviewCount: 57,
      type: "Dental Clinic",
      address: "1, J.P Rizal Avenue, Manggahan",
      time: "8:00 AM -11:00 AM, 12:00PM - 5:00 PM",
    },
    {
      id: "xAdq4",
      name: "Ultra Dental Clinic",
      rating: 1.5,
      reviewCount: 160,
      type: "Dental Clinic",
      address: "1, J.P Rizal Avenue, Manggahan",
      time: "8:00 AM -11:00 AM, 12:00PM - 5:00 PM",
    },
  ];

  const sortedServices = services.sort((a, b) => {
    return a.rating * a.reviewCount - b.rating * b.reviewCount;
  });

  const serviceCards = sortedServices.map((service) => {
    return (
      <Link href={"/service/" + service.id} key={service.id}>
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
