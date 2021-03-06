import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useState } from "react";
import Moment from "react-moment";
import StarRating from "./../StarRating/StarRating";

export default function Appointment({ children, desc }) {
  const [closed, setClosed] = useState(true);

  const descriptionStyle = {
    display: closed ? "none" : "block",
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
        <span>
          {desc.title}
          <Moment date={desc.startDate} format=" - LT, LL (ddd)" />
        </span>
        <span>
          <span className="mx-12">{desc.status}</span>
          {closed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </span>
      </div>
      <div
        className="bg-gray-50 w-full py-6 px-8 text-xl"
        style={descriptionStyle}
      >
        <div className="text-gray-500 mb-8">
          <div>Requester: {desc.requestor.name}</div>
          {desc.description ? <div>Description: {desc.description}</div> : ""}
          <div>
            Datetime: <Moment date={desc.startDate} format="LT, LL (ddd)" />
          </div>
          {desc.endDate ? (
            <div>
              Duration:{" "}
              <Moment
                duration={desc.startDate}
                date={desc.endDate}
                format="HH:mm"
              />
            </div>
          ) : null}
          {desc.remarks ? <div>Remarks: {desc.remarks}</div> : ""}
          <div>Status: {desc.status}</div>
          {desc.rating ? (
            <div>
              Rating: <StarRating rating={desc.rating} reviewCount="" />{" "}
            </div>
          ) : null}
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
