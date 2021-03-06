import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";
import { http } from "../../../utils/apiMethods";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/state";

export default function ApproveDialog({ appointment, callback }) {
  const [appointmentEndDate, setAppointmentEndDate] = useState(
    moment(appointment.startDate)
  );
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const globals = useAppContext();
  const changeDateHandler = (e) => {
    const val = e.target.value;
    const n = moment(val);
    setAppointmentEndDate(n);
  };

  const reset = () => {
    setAppointmentEndDate(moment(appointment.startDate));
    setRemarks("");
    globals.methods.setState(false);
  };

  const approve = () => {
    const req = {
      _id: appointment._id,
      status: "Approved",
      endDate: appointmentEndDate.format("YYYY-MM-DDTHH:mm:ssZZ"),
    };
    if (remarks) {
      req["remarks"] = remarks;
    }
    setLoading(true);
    http("POST", "/api/provider/appointments", req)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          toast.success("Appointment has been aprroved");
          reset();
          callback(data.data);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
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
            placeholder="e.g. Laptop repaisr"
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
            value={appointment.requestor.name}
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
        <div className="flex-auto">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            End Date
          </div>
          <input
            className="p-2 border w-full mt-1 "
            type="datetime-local"
            value={appointmentEndDate.format("yyyy-MM-DDTHH:mm")}
            onChange={(e) => changeDateHandler(e)}
            min={moment(appointment.startDate).format("yyyy-MM-DDTHH:mm")}
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
            placeholder="Send message to the requester"
            value={remarks}
            onChange={(e) => {
              setRemarks(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <Button
          disabled={loading}
          onClick={() => {
            if (!loading) {
              approve();
            }
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
