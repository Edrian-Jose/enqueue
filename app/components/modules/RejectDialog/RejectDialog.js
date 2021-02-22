import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";

export default function RejectDialog({appointment}) {


  const changeDateHandler = (e) => {
    const val = e.target.value;
    const n = moment(val);
    setAppointmentEndDate(n);
  };
  return (
    <div>
      <div className="flex">
        <div className="flex-auto">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            Subject
          </div>
          <input
            type="text"
            className="p-2 border w-full mt-1"
            placeholder="e.g. Laptoasp repaisr"
            value={appointment.title}
            disabled
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex-auto">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            Requester
          </div>
          <input
            type="text"
            className="p-2 border w-full mt-1"
            placeholder="e.g. Laptop repaisr"
            value={appointment.requestor}
            disabled
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex-auto">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            Start Date
          </div>
          <input
            className="p-2 border w-full mt-1 "
            type="datetime-local"
            value={moment(appointment.startDate).format("yyyy-MM-DDTHH:mm")}
            disabled
          ></input>
        </div>
      </div>
      <div className="flex">
        <div className="flex-auto mt-4">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            Remarks
          </div>
          <textarea
            name="description"
            className="border p-2 mt-1 w-full"
            placeholder="Describe the reason of declined appointment"
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <Button>Confirm</Button>
      </div>
    </div>
  );
}
