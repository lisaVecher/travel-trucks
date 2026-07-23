import { FiStar } from "react-icons/fi";
import type { Review } from "@/types/camper";
import styles from "./Reviews.module.css";

interface ReviewsProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className={styles.stars}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < rating;

        return (
          <FiStar
            key={index}
            aria-hidden="true"
            className={isFilled ? styles.filledStar : styles.emptyStar}
          />
        );
      })}
    </div>
  );
}

export default function Reviews({ reviews }: ReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.list} aria-label="Camper reviews">
      {reviews.map((review) => (
        <article key={review.id} className={styles.review}>
          <div className={styles.heading}>
            <span className={styles.avatar} aria-hidden="true">
              {review.reviewer_name.charAt(0).toUpperCase()}
            </span>

            <div>
              <h3>{review.reviewer_name}</h3>

              <StarRating rating={review.reviewer_rating} />
            </div>
          </div>

          <p>{review.comment}</p>
        </article>
      ))}
    </div>
  );
}
