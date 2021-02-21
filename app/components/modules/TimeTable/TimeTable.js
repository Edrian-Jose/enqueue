import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./TimeTable.module.scss";
export default function TimeTable() {
  const [value, onChange] = useState(new Date());

  const timeTableLabels = [...Array(25).keys()].map((v, i) => {
    if (i <= 1) return;
    return <div className="w-full text-right h-6 mt-6">{i + ":00"}</div>;
  });
  return (
    <div className="flex flex-nowrap h-96">
      <div className="bg-white flex-auto max-w-sm">
        {/* <p>Close</p> */}
        <Calendar
          onChange={onChange}
          value={value}
          className="w-60 mx-auto bg-white"
        />
      </div>
      <div
        className={[
          "border",
          "flex-auto",
          "flex",
          "overflow-y-scroll",
          "rounded-lg",
          styles.appointmentContainer,
        ].join(" ")}
      >
        <div className=" w-15 pr-2 text-gray-500">
          <div className="w-full text-right h-6 mt-9">1:00</div>
          {timeTableLabels}
        </div>
        <div className="flex-auto">
          <div className="w-full h-12 border-b box-border overflow-hidden"></div>
          <div className="w-full h-12 border-b box-border overflow-hidden"></div>
          <div className="w-full h-12 border-b box-border overflow-hidden"></div>
          <div className="w-full h-12 border-b box-border overflow-hidden"></div>
          <div className="w-full h-12 border-b box-border overflow-hidden"></div>
          <div className="w-full h-24 border-b  rounded-lg">
            <div className="w-11/12 h-full border-b bg-red-600 rounded-lg p-4 text-white text-xs">
              <div>Pending - 5:00 AM - 7:00 AM {value.toISOString()}</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
