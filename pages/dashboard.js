import Head from "next/head";
import Footer from "../app/components/modules/Footer/Footer";
import Navbar from "../app/components/modules/Navbar/Navbar";
import { useAppContext } from "../app/context/state";
import Button from "../app/components/elements/Button/Button";
import Appointment from "../app/components/elements/Appointment/Appointment";
import TimeTable from "./../app/components/modules/TimeTable/TimeTable";
import EnqueueDialog from "./../app/components/modules/EnqueueDialog/EnqueueDialog";
import ApproveDialog from "./../app/components/modules/ApproveDialog/ApproveDialog";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { dialog } = router.query;
  const globalState = useAppContext();

  useEffect(() => {
    if (dialog == "openEnqueue") {
      openEnqueueDialog();
    }
  }, [dialog]);

  const service = {
    name: "Remudaro Boongaling Dental Clinic",
    rating: 3.7,
    reviewCount: 59,
    type: "Dental Clinic",
    address: "1, J.P Rizal Avenue, Manggahan",
    time: "Open Time : 8:00 AM -11:00 AM, 12:00PM - 5:00 PM",
  };

  const openEnqueueDialog = () => {
    globalState.sharedState.dialog.setContent(<ApproveDialog />);
    globalState.sharedState.dialog.setTitle("Approve an appointment");
    globalState.sharedState.dialog.setState(true);
  };
  return (
    <div>
      <Head>
        <title>Enqueue - {globalState.service}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />

      <div className="px-20">
        <TimeTable className="mt-10" />
        {/* <ServiceDetails service={service} /> */}
        <div className="flex items-center justify-between my-8">
          <span className="text-xl">Your appointments to this service</span>
          <Button
            onClick={() => {
              openEnqueueDialog();
            }}
          >
            Enqueue
          </Button>
        </div>
        <div>
          <Appointment>
            <Button>Dismiss</Button>
          </Appointment>
          <Appointment />
        </div>
      </div>
      <Footer />
    </div>
  );
}
