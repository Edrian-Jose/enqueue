import Head from "next/head";
import Footer from "../app/components/modules/Footer/Footer";
import Navbar from "../app/components/modules/Navbar/Navbar";
import StarRating from "../app/components/elements/StarRating/StarRating";
import { useAppContext } from "../app/context/state";
import Title from "../app/components/elements/Title/Title";
import Subtitle from "./../app/components/elements/Subtitle/Subtitle";
import ServiceDetails from "../app/components/modules/ServiceDetails/ServiceDetails";
import Button from "../app/components/elements/Button/Button";

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
          <div>
            <div className="bg-gray-200 w-full py-6 px-8 text-xl flex justify-between">
              <span>Cosmetic whitening - 10:00 AM, January 6, 2021</span>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
