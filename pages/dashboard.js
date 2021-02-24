import Head from "next/head";
import Footer from "../app/components/modules/Footer/Footer";
import Navbar from "../app/components/modules/Navbar/Navbar";
import { useAppContext } from "../app/context/state";
import Button from "../app/components/elements/Button/Button";
import Appointment from "../app/components/elements/Appointment/Appointment";
import TimeTable from "./../app/components/modules/TimeTable/TimeTable";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import RejectDialog from "./../app/components/modules/RejectDialog/RejectDialog";
import CancelDialog from "./../app/components/modules/CancelDialog/CancelDialog";
import moment from "moment";
import ApproveDialog from "./../app/components/modules/ApproveDialog/ApproveDialog";

export default function Dashboard() {
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

  const openApproveDialog = (appointment) => {
    globalState.sharedState.dialog.setContent(
      <ApproveDialog appointment={appointment} />
    );
    globalState.sharedState.dialog.setTitle("Approve an appointment");
    globalState.sharedState.dialog.setState(true);
  };

  const openCancelDialog = (appointment) => {
    globalState.sharedState.dialog.setContent(
      <CancelDialog appointment={appointment} />
    );
    globalState.sharedState.dialog.setTitle("Cancel appointment");
    globalState.sharedState.dialog.setState(true);
  };

  const openRejectDialog = (appointment) => {
    globalState.sharedState.dialog.setContent(
      <RejectDialog appointment={appointment} />
    );
    globalState.sharedState.dialog.setTitle("Decline appointment");
    globalState.sharedState.dialog.setState(true);
  };

  const completeAppointment = (appointment) => {
    console.log("completed " + appointment.title);
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
      startDate: new Date(2021, 1, 22, 19, 15),
      endDate: new Date(2021, 1, 22, 20, 30),
      description: "I want a new haircut",
      requestor: "Juan Dela Cruz",
      status: "Approved",
    },
    {
      title: "Haircut e",
      startDate: new Date(2021, 1, 22, 23, 15),
      endDate: new Date(2021, 1, 22, 23, 30),
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

  const pendingCompletionAppointments = appointments.filter((appointment) => {
    const now = moment();
    return appointment.status == "Pending Completion";
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

  const createCards = (appointments) => {
    return appointments.map((appointment) => {
      let el = null;
      if (appointment.status == "Pending Approval") {
        el = (
          <React.Fragment>
            <Button
              className="ml-4"
              onClick={() => {
                openApproveDialog(appointment);
              }}
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                openRejectDialog(appointment);
              }}
            >
              Reject
            </Button>
          </React.Fragment>
        );
      } else if (appointment.status == "Approved") {
        el = (
          <Button
            onClick={() => {
              openCancelDialog(appointment);
            }}
          >
            Cancel
          </Button>
        );
      } else if (appointment.status == "Pending Completion") {
        el = (
          <React.Fragment>
            <Button
              className="ml-4"
              onClick={() => {
                completeAppointment(appointment);
              }}
            >
              Mark as done
            </Button>
            <Button
              onClick={() => {
                openCancelDialog(appointment);
              }}
            >
              Cancel
            </Button>
          </React.Fragment>
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
  const pendingCompletionAppointmentCards = createCards(
    pendingCompletionAppointments
  );
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
        <TimeTable
          className="mt-10"
          appointments={appointments}
          service={service}
        />
        {onDueAppointments.length > 0 ? (
          <div>
            <div className="flex items-center justify-between my-8">
              <span className="text-xl">Your on due appointments</span>
            </div>
            <div>{onDueAppointmentCards}</div>
          </div>
        ) : null}
        {approvedAppointments.length > 0 ? (
          <div>
            <div className="flex items-center justify-between my-8">
              <span className="text-xl">Your approved appointments</span>
            </div>
            <div>{approvedAppointmentCards}</div>
          </div>
        ) : null}
        {pendingCompletionAppointments.length > 0 ? (
          <div>
            <div className="flex items-center justify-between my-8">
              <span className="text-xl">
                Your pending for completion appointments
              </span>
            </div>
            <div>{pendingCompletionAppointmentCards}</div>
          </div>
        ) : null}
        {pendingApprovalAppointments.length > 0 ? (
          <div>
            <div className="flex items-center justify-between my-8">
              <span className="text-xl">
                Your pending for approval appointments
              </span>
            </div>
            <div>{pendingApprovalAppointmentCards}</div>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
