import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";
import { http } from "../../../utils/apiMethods";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/state";

export default function CancelDialog({ appointment, callback }) {
  const [appointmentStartDate, setAppointmentStartDate] = useState(
    moment(appointment.startDate).add(1, "m") || moment()
  );
  const globals = useAppContext();
  const changeDateHandler = (e) => {
    const val = e.target.value;
    const n = moment(val);
    setAppointmentStartDate(n);
  };

  const diff = parseInt(
    moment(appointment.startDate).format("x") -
      parseInt(appointmentStartDate.format("x"))
  );

  const reset = () => {
    globals.methods.setState(false);
  };

  const cancel = () => {
    http("DELETE", `/api/provider/appointments?id=${appointment._id}`)
      .then((data) => {
        if (data.success) {
          toast.success("Appointment has been cancelled");
          reset();
          callback(data.data);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        <Button
          disabled={diff != 0}
          onClick={() => {
            cancel();
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
