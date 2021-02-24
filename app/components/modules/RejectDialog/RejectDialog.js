import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";
import { http } from "../../../utils/apiMethods";
import { toast } from "react-toastify";

export default function RejectDialog({ appointment, callback }) {
  const [remarks, setRemarks] = useState("");

  const reject = () => {
    const req = {
      _id: appointment._id,
      status: "Rejected",
    };
    if (remarks) {
      req["remarks"] = remarks;
    }
    http("POST", "/api/provider/appointments", req)
      .then((data) => {
        if (data.success) {
          toast.success("Appointment has been rejected");
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
      </div>
      <div className="flex">
        <div className="flex-auto mt-4">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            Remarks
          </div>
          <textarea
            value={remarks}
            onChange={(e) => {
              setRemarks(e.target.value);
            }}
            name="description"
            className="border p-2 mt-1 w-full"
            placeholder="Describe the reason of declined appointment"
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <Button
          onClick={() => {
            reject();
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
