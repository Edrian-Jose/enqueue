import Head from "next/head";
import Footer from "../../app/components/modules/Footer/Footer";
import Navbar from "../../app/components/modules/Navbar/Navbar";
import { useAppContext } from "../../app/context/state";
import Button from "../../app/components/elements/Button/Button";
import Appointment from "../../app/components/elements/Appointment/Appointment";
import TimeTable from "../../app/components/modules/TimeTable/TimeTable";
import EnqueueDialog from "../../app/components/modules/EnqueueDialog/EnqueueDialog";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RateDialog from "../../app/components/modules/RateDialog/RateDialog";
import CancelDialog from "../../app/components/modules/CancelDialog/CancelDialog";
import moment from "moment";
import { http } from "../../app/utils/apiMethods";
import { server } from "../../app/utils/config";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

function Service({ serviceDefault, serviceAppointments }) {
  const router = useRouter();
  const [pickedDate, setPickedDate] = useState(moment());
  const [service, setService] = useState(serviceDefault);
  const [tableAppointments, setTableAppointments] = useState(
    serviceAppointments
  );
  const [appointments, setAppointments] = useState([]);
  const [refreshingService, setRefreshingService] = useState(false);
  const [refreshingTable, setRefreshingTable] = useState(false);
  const [refreshingAppointments, setRefreshingAppointments] = useState(false);

  const { dialog, sid } = router.query;

  const globalState = useAppContext();

  const addAppointment = (appointment) => {
    const tempAppointments = [...appointments];
    tempAppointments.push(appointment);
    setAppointments(tempAppointments);
  };

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

  const getAppointments = () => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      const user = jwt_decode(auth);
      setRefreshingAppointments(true);
      http(
        "GET",
        `${server}/api/customer/appointments?serviceId=${sid}&id=${user._id}&type=customer`
      )
        .then((d) => {
          setRefreshingAppointments(false);
          if (d.success) {
            setAppointments(d.data);
          } else {
            console.error("Failed to get appointments", d.message);
          }
        })
        .catch((e) => {
          setRefreshingAppointments(false);
          console.error(e);
        });
    }
  };

  const getServiceDetails = () => {
    setRefreshingService(true);
    http("GET", `${server}/api/service?id=${sid}&type=customer`)
      .then((d) => {
        setRefreshingService(false);
        if (d.success) {
          setService(d.data);
        } else {
          console.error("Failed to get service details", d.message);
        }
      })
      .catch((e) => {
        setRefreshingService(false);
        console.error(e);
      });
  };

  const getTableAppointments = (date) => {
    setRefreshingTable(true);
    http(
      "GET",
      `${server}/api/provider/appointments?id=${sid}&date=${date}&type=customer`
    )
      .then((d) => {
        setRefreshingTable(false);
        if (d.success) {
          setTableAppointments(d.data);
        } else {
          console.error("Failed to get table appointments", d.message);
        }
      })
      .catch((e) => {
        setRefreshingTable(false);
        console.error(e);
      });
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (dialog == "openEnqueue") {
      openEnqueueDialog();
    }
    if (auth) {
      getAppointments();
    }
  }, []);

  const handleDateChange = (date, callback) => {
    http(
      "GET",
      `${server}/api/provider/appointments?id=${service._id}&date=${moment(
        date
      ).format("YYYY-MM-DD")}&type=customer`
    )
      .then((d) => {
        if (d.success) {
          if (d.data) {
            setTableAppointments(d.data);
            callback(false);
          }
        } else {
          console.error("Failed to get table appointments", d.message);
        }
      })
      .catch((e) => console.error(e));
  };

  const handleRefresh = (date) => {
    const auth = localStorage.getItem("auth");
    if (!refreshingService) {
      getServiceDetails();
    }
    if (!refreshingTable) {
      getTableAppointments(moment(date).format("YYYY-MM-DD"));
    }

    if (!refreshingAppointments && auth) {
      getAppointments();
    }
  };

  const openEnqueueDialog = (appointment) => {
    globalState.methods.setContent(
      <EnqueueDialog serviceId={service._id} callback={addAppointment} />
    );
    globalState.methods.setTitle("Enqueue an appointment");
    globalState.methods.setState(true);
  };

  const openCancelDialog = (appointment) => {
    globalState.methods.setContent(
      <CancelDialog appointment={appointment} callback={deleteAppointment} />
    );
    globalState.methods.setTitle("Cancel appointment");
    globalState.methods.setState(true);
  };

  const openRateDialog = (appointment) => {
    globalState.methods.setContent(
      <RateDialog appointment={appointment} callback={deleteAppointment} />
    );
    globalState.methods.setTitle("Rate appointment");
    globalState.methods.setState(true);
  };

  const dismiss = (appointment) => {
    http("DELETE", `/api/provider/appointments?id=${appointment._id}`)
      .then((data) => {
        if (data.success) {
          toast.success("Appointment has been dismissed");
          deleteAppointment(appointment);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onDueAppointments = appointments
    .filter((appointment) => {
      const now = moment();
      return (
        appointment.status == "Approved" &&
        appointment.endDate &&
        moment(appointment.startDate) <= now &&
        moment(appointment.endDate) > now
      );
    })
    .sort((a, b) => {
      return moment(a.startDate).format("x") - moment(b.startDate).format("x");
    });

  const completedAppointments = appointments
    .filter((appointment) => {
      const now = moment();
      return appointment.status == "Completed" && !appointment.rating;
    })
    .sort((a, b) => {
      return moment(a.startDate).format("x") - moment(b.startDate).format("x");
    });

  const pendingApprovalAppointments = appointments
    .filter((appointment) => {
      const now = moment();
      return (
        appointment.status == "Pending Approval" &&
        moment(appointment.startDate) > now
      );
    })
    .sort((a, b) => {
      return moment(a.startDate).format("x") - moment(b.startDate).format("x");
    });

  const approvedAppointments = appointments
    .filter((appointment) => {
      const now = moment();
      return (
        appointment.status == "Approved" && moment(appointment.startDate) > now
      );
    })
    .sort((a, b) => {
      return moment(a.startDate).format("x") - moment(b.startDate).format("x");
    });

  const rejectedAppointments = appointments
    .filter((appointment) => {
      const now = moment();
      return appointment.status == "Rejected";
    })
    .sort((a, b) => {
      return moment(a.startDate).format("x") - moment(b.startDate).format("x");
    });

  const appointmentsCount =
    onDueAppointments.length +
    pendingApprovalAppointments.length +
    completedAppointments.length +
    rejectedAppointments.length +
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
      } else if (appointment.status == "Rejected") {
        el = (
          <Button
            onClick={() => {
              dismiss(appointment);
            }}
          >
            Dismiss
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
  const rejectedAppointmentCards = createCards(rejectedAppointments);

  return (
    <div>
      <Head>
        <title>Enqueue - {serviceDefault.name}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />

      <div className="px-20">
        <TimeTable
          className="mt-10"
          appointments={tableAppointments}
          service={service}
          onRefresh={handleRefresh}
          onDateChange={(d, c) => {
            handleDateChange(d, c);
          }}
        />

        <div>
          {globalState.sharedState.user ? (
            <div className="flex items-center justify-between my-8">
              <span className="text-xl">
                {appointmentsCount > 0 ? "Your" : "No"} appointments
              </span>

              <Button onClick={() => openEnqueueDialog()}>Enqueue</Button>
            </div>
          ) : null}
          {appointmentsCount > 0 ? (
            <div>
              <div>{onDueAppointmentCards}</div>
              <div>{approvedAppointmentCards}</div>
              <div>{completedAppointmentCards}</div>
              <div>{pendingApprovalAppointmentCards}</div>
              <div>{rejectedAppointmentCards}</div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  let serviceDefault = null;
  let serviceAppointments = [];

  await http(
    "GET",
    `${server}/api/service?id=${context.params.sid}&type=customer`
  )
    .then((d) => {
      if (d.success) {
        serviceDefault = d.data;
      } else {
        console.errpr("Failed to get initial service details", d.message);
      }
    })
    .catch((e) => console.error(e));

  await http(
    "GET",
    `${server}/api/provider/appointments?id=${
      context.params.sid
    }&date=${moment().format("YYYY-MM-DD")}&type=customer`
  )
    .then((d) => {
      if (d.success) {
        serviceAppointments = d.data;
      } else {
        console.errpr("Failed to get initial table appointments", d.message);
      }
    })
    .catch((e) => console.error(e));

  // Pass data to the page via props
  return { props: { serviceDefault, serviceAppointments } };
}

export default Service;
