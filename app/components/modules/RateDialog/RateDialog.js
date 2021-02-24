import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";
import dynamic from "next/dynamic";
import { useAppContext } from "../../../context/state";

const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

export default function RateDialog({ appointment, calback }) {
  const [appointmentRate, setAppointmentRate] = useState(3);
  const globals = useAppContext();
  const changeRateHandler = (e) => {
    const val = parseFloat(e);
    setAppointmentRate(val);
  };

  const reset = () => {
    setAppointmentRate(3);
    globals.methods.useState(false);
  };

  const rate = () => {
    const req = {
      _id: appointment._id,
      rating: appointmentRate,
    };
    if (remarks) {
      req["remarks"] = remarks;
    }
    http("POST", "/api/customer/rate", req)
      .then((data) => {
        if (data.success) {
          toast.success("Appointment had been rated ");
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
        <div className="flex-auto flex justify-center">
          <div className="mx-auto my-8">
            <StarRatings
              rating={appointmentRate}
              starDimension="32px"
              starSpacing="4px"
              starRatedColor="rgb(254, 186,54)"
              starHoverColor="rgb(254, 186,54)"
              changeRating={(e) => changeRateHandler(e)}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-row-reverse">
        <Button onClick={() => rate()}>Confirm</Button>
      </div>
    </div>
  );
}
