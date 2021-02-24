import Head from "next/head";
import Footer from "../app/components/modules/Footer/Footer";
import Navbar from "../app/components/modules/Navbar/Navbar";
import { useAppContext } from "../app/context/state";
import Button from "../app/components/elements/Button/Button";
import Appointment from "../app/components/elements/Appointment/Appointment";
import TimeTable from "./../app/components/modules/TimeTable/TimeTable";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RejectDialog from "./../app/components/modules/RejectDialog/RejectDialog";
import CancelDialog from "./../app/components/modules/CancelDialog/CancelDialog";
import moment from "moment";
import ApproveDialog from "./../app/components/modules/ApproveDialog/ApproveDialog";
import { http } from "../app/utils/apiMethods";
import { server } from "../app/utils/config";
import jwt_decode from "jwt-decode";

export default function Dashboard() {
  const router = useRouter();
  const globalState = useAppContext();
  const [service, setService] = useState({
    name: "Fetching",
    type: "Fetching",
    rating: 0,
    reviewCount: 0,
    opentime: "Fetching",
    address: "Fetching",
  });
  const [tableAppointments, setTableAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const getServiceDetails = () => {
    const auth = localStorage.getItem("auth");
    const user = jwt_decode(auth);

    http("GET", `${server}/api/service?id=${user._id}&type=provider`)
      .then((d) => {
        if (d.success) {
          setService(d.data);
        } else {
          console.log("sdsd");
        }
      })
      .catch((e) => console.error(e));
  };

  const getTableAppointments = (date, callback) => {
    const auth = localStorage.getItem("auth");
    const user = jwt_decode(auth);

    http(
      "GET",
      `${server}/api/provider/appointments?id=${user._id}&date=${moment(
        date
      ).format("YYYY-MM-DD")}&type=provider`
    )
      .then((d) => {
        if (d.success) {
          if (d.data) {
            setTableAppointments(d.data);
            callback(false);
          }
        } else {
          console.log("sdsd appointments");
        }
      })
      .catch((e) => console.error(e));
  };

  const getAppointments = () => {
    const auth = localStorage.getItem("auth");
    const user = jwt_decode(auth);

    http(
      "GET",
      `${server}/api/customer/appointments?serviceId=${user._id}&id=${user._id}&type=provider`
    )
      .then((d) => {
        if (d.success) {
          setAppointments(d.data);
          console.log(d.data);
        } else {
          console.log("sdsd appointments");
        }
      })
      .catch((e) => console.error(e));
  };

  const handleDateChange = (date, callback) => {
    getTableAppointments(date, callback);
  };

  useEffect(() => {
    getServiceDetails();
    getTableAppointments(new Date(), (b) => {
      console.log(b);
    });
    getAppointments();
  }, []);

  const changeAppointment = (appointment) => {
    let tempAppointments = [...appointments];
    tempAppointments = tempAppointments.map((a) => {
      if (a._id == appointment._id) {
        a = appointment;
      }
      return a;
    });
    setAppointments(tempAppointments);
  };

  const deleteAppointment = (appointment) => {
    let tempAppointments = [...appointments];
    tempAppointments = tempAppointments.filter((a) => {
      return a._id != appointment._id;
    });
    setAppointments(tempAppointments);
  };

  const openApproveDialog = (appointment) => {
    globalState.methods.setContent(
      <ApproveDialog appointment={appointment} callback={changeAppointment} />
    );
    globalState.methods.setTitle("Approve an appointment");
    globalState.methods.setState(true);
  };

  const openCancelDialog = (appointment) => {
    globalState.methods.setContent(<CancelDialog appointment={appointment} />);
    globalState.methods.setTitle("Cancel appointment");
    globalState.methods.setState(true);
  };

  const openRejectDialog = (appointment) => {
    globalState.methods.setContent(
      <RejectDialog appointment={appointment} callback={deleteAppointment} />
    );
    globalState.methods.setTitle("Decline appointment");
    globalState.methods.setState(true);
  };

  const completeAppointment = (appointment) => {
    console.log("completed " + appointment.title);
  };

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
    return (
      appointment.status == "Approved" && moment(appointment.endDate) < now
    );
  });

  const pendingApprovalAppointments = appointments.filter((appointment) => {
    const now = moment();
    return (
      appointment.status == "Pending Approval" &&
      moment(appointment.startDate) > now
    );
  });

  const approvedAppointments = appointments.filter((appointment) => {
    const now = moment();
    return (
      appointment.status == "Approved" && moment(appointment.startDate) > now
    );
  });

  const createCards = (appointments) => {
    const now = moment();
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
      } else if (
        appointment.status == "Approved" &&
        moment(appointment.endDate) < now
      ) {
        appointment.status = "Pending Completion";
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
          appointments={tableAppointments}
          service={service}
          onDateChange={(d, c) => {
            handleDateChange(d, c);
          }}
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
