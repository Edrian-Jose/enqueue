import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";

export default function CancelDialog({ appointment }) {
  const [appointmentStartDate, setAppointmentStartDate] = useState(
    moment(appointment.startDate).add(1, "m") || moment()
  );

  const changeDateHandler = (e) => {
    const val = e.target.value;
    const n = moment(val);
    setAppointmentStartDate(n);
  };
  const diff = parseInt(
    moment(appointment.startDate).format("x") -
      parseInt(appointmentStartDate.format("x"))
  );

  return (
    <div>
      <div className="flex">
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
      <div className="flex mt-4">
        <div className="flex-auto">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            Input the Start Date here for confirmation
          </div>
          <input
            className="p-2 border w-full mt-1 "
            type="datetime-local"
            value={appointmentStartDate.format("yyyy-MM-DDTHH:mm")}
            onChange={(e) => changeDateHandler(e)}
          ></input>
        </div>
      </div>

      <div className="mt-4 flex flex-row-reverse">
        <Button disabled={diff != 0}>Confirm</Button>
      </div>
    </div>
  );
}
