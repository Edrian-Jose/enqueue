import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useState } from "react";
export default function Appointment() {
  const [closed, setClosed] = useState(true);

  const descriptionStyle = {
    display: closed ? "none" : "block",
  };

  return (
    <div>
      <div className="bg-gray-200 w-full py-6 px-8 text-xl flex justify-between">
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
        <span>Hello</span>
      </div>
    </div>
  );
}
