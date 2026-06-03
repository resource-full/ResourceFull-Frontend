"use client";

import { useId } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  mutedLabel?: boolean;
}

export default function Checkbox({
  label,
  checked,
  onChange,
  className = "",
  mutedLabel = false,
}: CheckboxProps) {
  const id = useId();

  return (
    <label htmlFor={id} className={`${styles.checkboxWrapper} ${className}`}>
      <input
        id={id}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={styles.box}>
        <svg
          className={styles.checkIcon}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      {label && (
        <span className={`${styles.label} ${mutedLabel ? styles.labelMuted : ""}`}>
          {label}
        </span>
      )}
    </label>
  );
}
