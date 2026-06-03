"use client";

import styles from "./ErrorModal.module.css";

interface ErrorModalProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose?: () => void;
}

const XIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function ErrorModal({
  title = "Profile Edit Failed",
  subtitle = "Whoops! There seems to be an issue. Please try again.",
  primaryButtonText = "Try again",
  secondaryButtonText = "Go to profile",
  onPrimary,
  onSecondary,
  onClose,
}: ErrorModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Error icon area */}
        <div className={styles.iconArea}>
          <div className={styles.xCircle}>
            <XIcon />
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onSecondary}
            >
              {secondaryButtonText}
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={onPrimary}
            >
              {primaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
