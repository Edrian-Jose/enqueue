import dynamic from "next/dynamic";

const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

export default function StarRating({ rating, reviewCount }) {
  return (
    <span className="font-semibold text-gray-500">
      <span> {rating}</span>
      <StarRatings
        rating={parseFloat(rating)}
        starDimension="16px"
        starSpacing="2px"
        starRatedColor="rgb(254, 186,54)"
      />
      <span> {reviewCount ? `( ${reviewCount} )` : null}</span>
    </span>
  );
}
