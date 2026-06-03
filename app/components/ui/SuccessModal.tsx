"use client";

import { useRouter } from "next/navigation";
import styles from "./SuccessModal.module.css";

interface SuccessModalProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  redirectTo?: string;
  onClose?: () => void;
}

const CheckIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function SuccessModal({
  title = "Account Created Successfully!",
  subtitle = "You have successfully created your resourcefull account",
  buttonText = "Login to Resourcefull",
  redirectTo = "/login",
  onClose,
}: SuccessModalProps) {
  const router = useRouter();

  const handleAction = () => {
    if (onClose) onClose();
    router.push(redirectTo);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Success icon area */}
        <div className={styles.iconArea}>
          <div className={styles.checkCircle}>
            <CheckIcon />
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleAction}
            id="success-modal-action"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
