import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";

export default function EnqueueDialog() {
  const [apppointmentDate, setApppointmentDate] = useState(moment());

  const changeDateHandler = (e) => {
    const val = e.target.value;
    const n = moment(val);
    setApppointmentDate(n);
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
            placeholder="e.g. Laptop repair"
          />
        </div>
        <div>
          <div className="text-gray-500 text-sm px-2 font-semibold">Date</div>
          <input
            className="p-2 border w-full mt-1 "
            type="datetime-local"
            value={apppointmentDate.format("yyyy-MM-DDTHH:mm")}
            onChange={(e) => changeDateHandler(e)}
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
            className="border p-2 mt-1 w-full"
            placeholder="Describe your appointment here"
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <Button>Enqueue</Button>
      </div>
    </div>
  );
}
