import Title from "./../../elements/Title/Title";
import StarRating from "./../../elements/StarRating/StarRating";
import Subtitle from "./../../elements/Subtitle/Subtitle";

export default function ServiceCard({ service, className }) {
  return (
    <div
      className={
        "select-none group p-12 border flex flex-row hover:bg-gray-50 " +
        className
      }
      title="Click to view time schedule"
    >
      <div className="flex items-center mr-8">
        <img
          src={service.photo}
          className="h-44 rounded-lg shadow-md opacity-80 group-hover:opacity-100"
        />
      </div>
      <div>
        <div className="flex items-center my-3 text-gray-600 group-hover:text-black ">
          <Title>{service.name}</Title>
        </div>
        <div className="my-3">
          <StarRating
            rating={service.rating}
            reviewCount={service.reviewCount}
          />
          <Subtitle className="ml-4 text-gray-600 group-hover:text-black">
            {service.serviceType}
          </Subtitle>
        </div>
        <div className="my-3">
          <Subtitle className="text-gray-600 group-hover:text-black">
            {service.opentime}
          </Subtitle>
        </div>
        <div className="my-3">
          <Subtitle className="text-gray-600 group-hover:text-black">
            {service.address}
          </Subtitle>
        </div>
      </div>
    </div>
  );
}
