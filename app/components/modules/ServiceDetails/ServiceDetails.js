import React from "react";
import Title from "./../../elements/Title/Title";
import StarRating from "./../../elements/StarRating/StarRating";
import Subtitle from "./../../elements/Subtitle/Subtitle";

export default function ServiceDetails({ service, className }) {
  return (
    <div className={className}>
      <div className="flex items-center mb-2">
        <Title>{service.name}</Title>
      </div>
      <div>
        <StarRating rating={service.rating} reviewCount={service.reviewCount} />
        <Subtitle className="ml-4">{service.type}</Subtitle>
      </div>
      <div>
        <Subtitle>{service.opentime}</Subtitle>
      </div>
      <div>
        <Subtitle>{service.address}</Subtitle>
      </div>
    </div>
  );
}
