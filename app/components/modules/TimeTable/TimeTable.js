import React, { useState, useRef, useEffect } from "react";
import styles from "./TimeTable.module.scss";
import moment from "moment";
import ServiceDetails from "./../ServiceDetails/ServiceDetails";
import { now } from "mongoose";

export default function TimeTable({
  className,
  appointments,
  service,
  onDateChange,
}) {
  const [datePicked, onChangeDatePicked] = useState(new Date());
  const [loading, setLoading] = useState(0);
  const timeTableRef = useRef(null);
  const timeTableLabels = [...Array(25).keys()].map((v, i) => {
    if (i <= 1) return;
    return (
      <div className="w-full text-right h-6 mt-6" key={v + i}>
        {i + ":00"}
      </div>
    );
  });
  const handleChangeDatePicked = (e) => {
    onChangeDatePicked(new Date(e.target.value));
    setLoading(true);
    onDateChange(new Date(e.target.value), toggleLoading);
  };

  const toggleLoading = (state) => {
    setLoading(state);
  };

  appointments = appointments.map((appointment) => {
    let d = appointment.startDate;
    let d2 = appointment.endDate;
    appointment.startDate = new Date(d);
    appointment.endDate = new Date(d2);
    return appointment;
  });
  const filteredAppointments = appointments.filter((appointment) => {
    return (
      appointment.status == "Approved" || appointment.status == "Completed"
    );
  });
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    return a.startDate.getTime() - b.startDate.getTime();
  });

  const timeTableCardsData = [];

  let prevDate = new Date(
    datePicked.getFullYear(),
    datePicked.getMonth(),
    datePicked.getDate()
  );
  const fullms = 86400000;
  const fullSize = 72.75;

  sortedAppointments.forEach((appointment) => {
    let cardSize = 0;
    let dateGap = appointment.startDate.getTime() - prevDate.getTime();
    let prevDateHour =
      prevDate.getMinutes() != 0
        ? prevDate.getHours() + 1
        : prevDate.getHours();
    let currentDateHour = appointment.startDate.getHours();
    let hourGap = currentDateHour - prevDateHour;
    for (let index = 0; index < hourGap; index++) {
      timeTableCardsData.push({
        size: fullSize / 24 + "rem",
        type: "bottom-gap",
      });
    }

    if (appointment.startDate.getMinutes() != 0) {
      cardSize =
        (appointment.startDate.getMinutes() / 60) * (fullSize / 24) + "rem";
      timeTableCardsData.push({
        size: cardSize,
        type: "top-gap",
      });
    }

    dateGap = appointment.endDate.getTime() - appointment.startDate.getTime();
    cardSize = (dateGap / fullms) * fullSize + "rem";
    timeTableCardsData.push({
      size: cardSize,
      type: appointment.status,
      info: `${moment(appointment.startDate).format("hh:mm A")} - ${moment(
        appointment.endDate
      ).format("hh:mm A")}`,
    });

    if (appointment.endDate.getMinutes() != 0) {
      cardSize =
        ((60 - appointment.endDate.getMinutes()) / 60) * (fullSize / 24) +
        "rem";
      timeTableCardsData.push({
        size: cardSize,
        type: "bottom-gap",
      });
    }

    prevDate = appointment.endDate;
  });

  if (appointments && appointments.length > 0) {
    const lastAppointmentEndDate =
      sortedAppointments[sortedAppointments.length - 1].endDate;

    const vacantHoursAftrLastStart =
      lastAppointmentEndDate.getMinutes() != 0
        ? lastAppointmentEndDate.getHours() + 1
        : lastAppointmentEndDate.getHours();

    for (let index = vacantHoursAftrLastStart; index < 24; index++) {
      timeTableCardsData.push({
        size: fullSize / 24 + "rem",
        type: "bottom-gap",
      });
    }
  }

  const timeTableCards = timeTableCardsData.map((data, i) => {
    const style = {
      height: data.size,
    };
    let el = null;
    let color = "bg-transparent";
    switch (data.type) {
      case "Pending Approval":
        color = "bg-red-500";
        break;
      case "Approved":
        color = "bg-blue-500";
        break;
      case "Completed":
        color = "bg-green-500";
        break;
      default:
        color = "bg-transparent";
        break;
    }

    if (data.type == "bottom-gap") {
      el = (
        <div
          className="w-full border-b box-border overflow-hidden"
          style={style}
          key={data.type + i}
        ></div>
      );
    } else if (data.type == "bottom-gap") {
      el = (
        <div
          className="w-full box-border overflow-hidden"
          style={style}
          key={data.type + i}
        ></div>
      );
    } else {
      el = (
        <div
          className="w-full rounded-lg box-border overflow-hidden"
          style={style}
          key={data.type + i}
          title={data.info}
        >
          <div
            className={
              "w-11/12 h-full rounded-md p-4 text-white text-xs box-border overflow-hidden" +
              " " +
              color
            }
          >
            <div>{data.info}</div>
          </div>
        </div>
      );
    }

    return el;
  });

  useEffect(() => {
    const timeNow = moment().hour();
    timeTableRef.current.scrollTop = timeNow * (fullSize / 24) * 16;
  });
  return (
    <div className={"flex flex-nowrap h-96 " + className}>
      <div className="bg-white flex-auto flex max-w-sm">
        <div className="px-6">
          <div>
            <ServiceDetails service={service} className="mb-10" />
          </div>
          <div>View appointments at</div>
          <div className="mx-auto text-xl font-bold mb-10">
            {moment(datePicked).format("dddd, ")}
            <input
              type="date"
              value={moment(datePicked.getTime()).format("yyyy-MM-DD")}
              onChange={(e) => {
                handleChangeDatePicked(e);
              }}
            />
          </div>
          <div>
            {appointments.filter(({ status }) => status == "Approved").length}{" "}
            approved appointments
          </div>
          <div>
            {appointments.filter(({ status }) => status == "Completed").length}{" "}
            completed appointments
          </div>
        </div>
      </div>
      <div
        ref={timeTableRef}
        className={[
          "border",
          "flex-auto",
          "flex",
          "overflow-y-scroll",
          "rounded-lg",
          styles.appointmentContainer,
        ].join(" ")}
      >
        {loading ? (
          <div className="flex flex-auto items-center">
            <div className="mx-auto">Fetching data ...</div>
          </div>
        ) : null}
        {!loading ? (
          <div className=" w-15 pr-2 text-gray-500">
            <div className="w-full text-right h-6 mt-9">1:00</div>
            {timeTableLabels}
          </div>
        ) : null}
        {!loading ? <div className="flex-auto">{timeTableCards}</div> : null}
      </div>
    </div>
  );
}
