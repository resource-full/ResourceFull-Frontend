"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./FilterByDropdown.module.css";

export interface FilterByOption {
  value: string;
  label: string;
}

export const DEFAULT_FILTER_OPTIONS: FilterByOption[] = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
  { value: "best_match", label: "Best match" },
  { value: "most_saved", label: "Most saved" },
  { value: "newest", label: "Newest" },
  { value: "highest_rating", label: "Highest rating" },
];

interface FilterByDropdownProps {
  options?: FilterByOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

/** Three horizontal centered lines icon matching the Figma design */
const FilterLinesIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className={styles.checkIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function FilterByDropdown({
  options = DEFAULT_FILTER_OPTIONS,
  selectedValues,
  onChange,
  className,
}: FilterByDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className={`${styles.filterWrapper} ${className || ""}`} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.filterTrigger} ${isOpen ? styles.filterTriggerActive : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Filter by"
      >
        <span className={styles.triggerIcon}>
          <FilterLinesIcon />
        </span>
        <span className={styles.triggerText}>Filter by:</span>
      </button>

      {isOpen && (
        <div className={styles.dropdownPanel} role="listbox" aria-label="Filter options">
          {options.map((opt) => {
            const isChecked = selectedValues.includes(opt.value);
            return (
              <div
                key={opt.value}
                className={styles.optionRow}
                onClick={() => toggleOption(opt.value)}
                role="option"
                aria-selected={isChecked}
              >
                <div
                  className={`${styles.checkbox} ${
                    isChecked ? styles.checkboxChecked : ""
                  }`}
                >
                  {isChecked && <CheckIcon />}
                </div>
                <input
                  type="checkbox"
                  className={styles.hiddenInput}
                  checked={isChecked}
                  onChange={() => toggleOption(opt.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <span className={styles.optionLabel}>{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
