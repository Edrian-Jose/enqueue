import Title from "./../../elements/Title/Title";
import StarRating from "./../../elements/StarRating/StarRating";
import Subtitle from "./../../elements/Subtitle/Subtitle";

export default function ServiceCard({ service, className }) {
  return (
    <div className={"p-12 border " + className}>
      <div className="flex items-center my-3">
        <Title>{service.name}</Title>
      </div>
      <div className="my-3">
        <StarRating rating={service.rating} reviewCount={service.reviewCount} />
        <Subtitle className="ml-4">{service.serviceType}</Subtitle>
      </div>
      <div className="my-3">
        <Subtitle>{service.opentime}</Subtitle>
      </div>
      <div className="my-3">
        <Subtitle>{service.address}</Subtitle>
      </div>
    </div>
  );
}
