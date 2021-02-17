import StarRatings from "react-star-ratings";

export default function StarRating({ rating, reviewCount }) {
  return (
    <span className="font-semibold text-gray-500 mx-4">
      <span> {rating}</span>
      <StarRatings
        rating={parseFloat(rating)}
        starDimension="16px"
        starSpacing="2px"
        starRatedColor="rgb(254, 186,54)"
      />
      <span> ({reviewCount})</span>
    </span>
  );
}
