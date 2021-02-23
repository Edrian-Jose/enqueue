import Head from "next/head";
import Footer from "../../app/components/modules/Footer/Footer";
import Navbar from "../../app/components/modules/Navbar/Navbar";
import { useAppContext } from "../../app/context/state";
import Button from "../../app/components/elements/Button/Button";
import Appointment from "../../app/components/elements/Appointment/Appointment";
import TimeTable from "../../app/components/modules/TimeTable/TimeTable";
import EnqueueDialog from "../../app/components/modules/EnqueueDialog/EnqueueDialog";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import RateDialog from "../../app/components/modules/RateDialog/RateDialog";
import CancelDialog from "../../app/components/modules/CancelDialog/CancelDialog";
import moment from "moment";

export default function Home() {
  const router = useRouter();
  const { dialog, sid } = router.query;

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

  const openEnqueueDialog = (appointment) => {
    globalState.sharedState.dialog.setContent(
      <EnqueueDialog appointment={appointment} />
    );
    globalState.sharedState.dialog.setTitle("Enqueue an appointment");
    globalState.sharedState.dialog.setState(true);
  };

  const openCancelDialog = (appointment) => {
    globalState.sharedState.dialog.setContent(
      <CancelDialog appointment={appointment} />
    );
    globalState.sharedState.dialog.setTitle("Cancel appointment");
    globalState.sharedState.dialog.setState(true);
  };

  const openRateDialog = (appointment) => {
    globalState.sharedState.dialog.setContent(
      <RateDialog appointment={appointment} />
    );
    globalState.sharedState.dialog.setTitle("Rate appointment");
    globalState.sharedState.dialog.setState(true);
  };

  const appointments = [
    {
      title: "Cosmetic whiteningg",
      startDate: new Date(2021, 1, 7, 8, 0),
      description: "Adjustment of braces lorem ipsum dajad sdasasas ",
      requestor: "Edrian Jose Ferrer",
      status: "Pending Approval",
    },
    {
      title: "Cosmetic whiteningg",
      startDate: new Date(2021, 1, 23, 8, 0),
      description: "Adjustment of braces lorem ipsum dajad sdasasas ",
      requestor: "Edrian Jose Ferrer",
      status: "Pending Approval",
    },
    {
      title: "Haircut",
      startDate: new Date(2021, 1, 7, 9, 15),
      endDate: new Date(2021, 1, 7, 9, 30),
      description: "I want a new haircut",
      requestor: "Juan Dela Cruz",
      status: "Approved",
    },
    {
      title: "Haircut e",
      startDate: new Date(2021, 1, 22, 21, 15),
      endDate: new Date(2021, 1, 22, 22, 30),
      description: "I want a new haircut",
      requestor: "Juan Dela Cruz",
      status: "Approved",
    },
    {
      title: "Haircut 2",
      startDate: new Date(2021, 1, 7, 7, 0),
      endDate: new Date(2021, 1, 7, 7, 20),
      description: "I need a haircut",
      requestor: "Juan Delos Santos",
      status: "Pending Completion",
    },
    {
      title: "Haircut 3",
      startDate: new Date(2021, 1, 7, 8, 0),
      endDate: new Date(2021, 1, 7, 8, 20),
      description: "I need a haircut 2",
      requestor: "Juan Delos Santos",
      status: "Completed",
    },
  ];

  const onDueAppointments = appointments.filter((appointment) => {
    const now = moment();
    return (
      moment(appointment.startDate) <= now &&
      moment(appointment.endDate) > now &&
      appointment.status == "Approved"
    );
  });

  const completedAppointments = appointments.filter((appointment) => {
    const now = moment();
    return appointment.status == "Completed" && !appointment.rating;
  });

  const pendingApprovalAppointments = appointments.filter((appointment) => {
    const now = moment();
    return (
      appointment.status == "Pending Approval" && appointment.startDate > now
    );
  });

  const approvedAppointments = appointments.filter((appointment) => {
    const now = moment();
    return appointment.status == "Approved" && appointment.startDate > now;
  });

  const appointmentsCount =
    onDueAppointments.length +
    pendingApprovalAppointments.length +
    completedAppointments.length +
    approvedAppointments.length;

  const createCards = (appointments) => {
    return appointments.map((appointment) => {
      let el = null;
      if (appointment.status == "Completed") {
        el = (
          <Button
            onClick={() => {
              openRateDialog(appointment);
            }}
          >
            Rate
          </Button>
        );
      } else {
        el = (
          <Button
            onClick={() => {
              openCancelDialog(appointment);
            }}
          >
            Cancel
          </Button>
        );
      }

      return (
        <Appointment desc={appointment}>
          <div className="flex flex-row-reverse">{el}</div>
        </Appointment>
      );
    });
  };

  const onDueAppointmentCards = createCards(onDueAppointments);
  const completedAppointmentCards = createCards(completedAppointments);
  const pendingApprovalAppointmentCards = createCards(
    pendingApprovalAppointments
  );
  const approvedAppointmentCards = createCards(approvedAppointments);

  return (
    <div>
      <Head>
        <title>Enqueue - {globalState.service}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />

      <div className="px-20">
        <TimeTable className="mt-10" appointments={appointments} />
        {appointmentsCount > 0 ? (
          <div>
            <div className="flex items-center justify-between my-8">
              <span className="text-xl">Your appointments</span>
              <Button onClick={() => openEnqueueDialog()}>Enqueue</Button>
            </div>
            <div>{onDueAppointmentCards}</div>
            <div>{approvedAppointmentCards}</div>
            <div>{completedAppointmentCards}</div>
            <div>{pendingApprovalAppointmentCards}</div>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
