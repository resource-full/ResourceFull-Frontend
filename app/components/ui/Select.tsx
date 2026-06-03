"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { SelectOption } from "@/app/lib/types/onboarding";
import styles from "./Select.module.css";

interface SelectProps {
  id: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  searchable?: boolean;
}

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Select({
  id,
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  error,
  searchable = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = searchable && search
    ? options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  /* Close on outside click */
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsOpen(false);
      setSearch("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  /* Focus search on open */
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <button
        type="button"
        id={id}
        className={`${styles.trigger} ${isOpen ? styles.isOpen : ""} ${error ? styles.hasError : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {selected ? (
          <span className={styles.triggerIcon}>
            {selected.icon && <span>{selected.icon}</span>}
            {selected.label}
          </span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <span className={`${styles.chevron} ${isOpen ? styles.rotated : ""}`}>
          <ChevronIcon />
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-labelledby={id}>
          {searchable && (
            <div className={styles.searchContainer}>
              <input
                ref={searchRef}
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {filtered.length === 0 ? (
            <div className={styles.noResults}>No results found</div>
          ) : (
            filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`${styles.option} ${option.value === value ? styles.selected : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.icon && (
                  <span className={styles.optionIcon}>{option.icon}</span>
                )}
                {option.label}
              </button>
            ))
          )}
        </div>
      )}

      {error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
