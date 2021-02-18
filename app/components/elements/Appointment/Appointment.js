import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useState } from "react";
import Button from "../Button/Button";
export default function Appointment() {
  const [closed, setClosed] = useState(true);

  const descriptionStyle = {
    display: closed ? "none" : "block",
  };

  const description = {
    description: "Adjustment of braces lorem ipsum dajad sdasasas ",
    dateStart: new Date(),
    duration: null,
    rejectMessage: null,
    requestor: null,
    status,
  };

  const border = closed ? "shadow-sm" : "shadow-md";
  return (
    <div className={["my-3", border].join(" ")}>
      <div
        className="bg-gray-100 w-full py-6 px-8 text-xl flex justify-between"
        onClick={() => {
          setClosed(!closed);
        }}
      >
        <span>Cosmetic whitening - 10:00 AM, January 6, 2021</span>
        <span>
          <span className="mx-12">Pending</span>
          {closed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </span>
      </div>
      <div
        className="bg-gray-50 w-full py-6 px-8 text-xl"
        style={descriptionStyle}
      >
        <div className="text-gray-500 mb-8">
          <div>Description: {description.description}</div>
          <div>Detetime: {description.dateStart.toUTCString()}</div>
        </div>

        <div>
          <Button>Dismiss</Button>
        </div>
      </div>
    </div>
  );
}
