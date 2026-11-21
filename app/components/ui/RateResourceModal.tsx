"use client";

import { useState } from "react";
import styles from "./RateResourceModal.module.css";

const StarOutlineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#024A94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill={filled ? "#F2A818" : "none"} stroke={filled ? "#F2A818" : "#D0D5DD"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

interface RateResourceModalProps {
  onClose: () => void;
  onSubmit: (rating: number) => void | Promise<void>;
  isSubmitting?: boolean;
}

export default function RateResourceModal({ onClose, onSubmit, isSubmitting }: RateResourceModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleDone = () => {
    if (rating === 0) return;
    onSubmit(rating);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <StarOutlineIcon />
          </div>
          <div className={styles.textGroup}>
            <h3 className={styles.title}>Rate this resource.</h3>
            <p className={styles.subtitle}>What do you think about this resource? Share your Feedback.</p>
          </div>
        </div>

        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={styles.starBtn}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <StarIcon filled={star <= (hoverRating || rating)} />
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.backBtn} onClick={onClose} disabled={isSubmitting}>
            Back
          </button>
          <button className={styles.doneBtn} onClick={handleDone} disabled={rating === 0 || isSubmitting}>
            {isSubmitting ? "Saving..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
