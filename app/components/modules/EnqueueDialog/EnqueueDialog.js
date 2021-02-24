import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";
import { useAppContext } from "../../../context/state";
import { http } from "../../../utils/apiMethods";
import { toast } from "react-toastify";

export default function EnqueueDialog({ serviceId }) {
  const [apppointmentDate, setApppointmentDate] = useState(moment());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const globals = useAppContext();
  const changeHandler = (e, prop) => {
    const val = e.target.value;
    if (prop == "date") {
      const n = moment(val);
      setApppointmentDate(n);
    } else if (prop == "title") {
      setTitle(val);
    } else if (prop == "desc") {
      setDescription(val);
    }
  };

  const enqueue = () => {
    const req = {
      title,
      description,
      startDate: apppointmentDate.format("yyyy-MM-DDTHH:mm"),
      requestor: {
        id: globals.sharedState.user._id,
        name: globals.sharedState.user.name,
      },
      status: "Pending Approval",
      serviceId,
    };

    http("POST", "http://localhost:3000/api/customer/appointments", req)
      .then((data) => {
        if (data.success) {
          toast.success("Appointment Created currently pending for approval ");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const disabled = !title;
  return (
    <div>
      <div className="flex">
        <div className="flex-auto">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            Subject
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => changeHandler(e, "title")}
            className="p-2 border w-full mt-1"
            placeholder="e.g. Laptop repair"
          />
        </div>
        <div>
          <div className="text-gray-500 text-sm px-2 font-semibold">Date</div>
          <input
            className="p-2 border w-full mt-1 "
            type="datetime-local"
            value={apppointmentDate.format("yyyy-MM-DDTHH:mm")}
            onChange={(e) => changeHandler(e, "date")}
            min={moment().format("yyyy-MM-DDTHH:mm")}
          ></input>
        </div>
      </div>
      <div className="flex">
        <div className="flex-auto mt-4">
          <div className="text-gray-500 text-sm px-2 font-semibold">
            Description
          </div>
          <textarea
            name="description"
            value={description}
            onChange={(e) => changeHandler(e, "desc")}
            className="border p-2 mt-1 w-full"
            placeholder="Describe your appointment here"
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <Button
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              enqueue();
            }
          }}
        >
          Enqueue
        </Button>
      </div>
    </div>
  );
}
