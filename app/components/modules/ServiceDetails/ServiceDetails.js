import React from "react";
import Title from "./../../elements/Title/Title";
import StarRating from "./../../elements/StarRating/StarRating";
import Subtitle from "./../../elements/Subtitle/Subtitle";

export default function ServiceDetails({ service }) {
  return (
    <div className="px-6 py-10 ">
      <div className="flex items-center mb-2">
        <Title>{service.name}</Title>
        <StarRating rating={service.rating} reviewCount={service.reviewCount} />
        <Subtitle>{service.type}</Subtitle>
      </div>
      <div>
        <Subtitle>{service.time}</Subtitle>
      </div>
      <div>
        <Subtitle>{service.address}</Subtitle>
      </div>
    </div>
  );
}
