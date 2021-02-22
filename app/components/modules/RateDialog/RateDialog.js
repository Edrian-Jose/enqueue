import { useState } from "react";
import moment from "moment";
import Button from "./../../elements/Button/Button";
import dynamic from "next/dynamic";

const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

export default function RateDialog({appointment}) {
  const [appointmentRate, setAppointmentRate] = useState(0);

  const changeRateHandler = (e) => {
    const val = parseFloat(e);
    setAppointmentRate(val);
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
        <Button>Confirm</Button>
      </div>
    </div>
  );
}
