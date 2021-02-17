import Head from "next/head";
import Footer from "../app/components/modules/Footer/Footer";
import Navbar from "../app/components/modules/Navbar/Navbar";
import { useAppContext } from "../app/context/state";
import ServiceDetails from "../app/components/modules/ServiceDetails/ServiceDetails";
import Button from "../app/components/elements/Button/Button";
import Appointment from "../app/components/elements/Appointment/Appointment";

export default function Home() {
  const globalState = useAppContext();
  const service = {
    name: "Remudaro Boongaling Dental Clinic",
    rating: 3.7,
    reviewCount: 59,
    type: "Dental Clinic",
    address: "1, J.P Rizal Avenue, Manggahan",
    time: "Open Time : 8:00 AM -11:00 AM, 12:00PM - 5:00 PM",
  };
  return (
    <div>
      <Head>
        <title>Enqueue - {globalState.service}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Navbar />
      <div className="px-20">
        <ServiceDetails service={service} />
        <div className="flex items-center justify-between">
          <span className="text-xl">Your appointments to this service</span>
          <Button>Enqueue</Button>
        </div>
        <div>
          <Appointment />
        </div>
      </div>
      <Footer />
    </div>
  );
}
