"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./FilterDropdown.module.css";

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterDropdownProps {
  label: string;
  icon?: React.ReactNode;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  enableSearch?: boolean;
}

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function FilterDropdown({
  label,
  icon,
  options,
  selectedValues,
  onChange,
  enableSearch = false,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (val: string) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter(v => v !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button 
        className={styles.dropdownTrigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {icon && <span className={styles.triggerIcon}>{icon}</span>}
        {label}
        <ChevronDown />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox">
          {enableSearch && (
            <div className={styles.searchContainer}>
              <input 
                type="text" 
                placeholder="Search..." 
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className={styles.menuItems}>
            {options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase())).map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              return (
                <div 
                  key={opt.value} 
                  className={styles.menuItem}
                  onClick={() => toggleOption(opt.value)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className={`${styles.checkbox} ${isSelected ? styles.checkboxSelected : ''}`}>
                    {isSelected && <CheckIcon />}
                  </div>
                  {opt.icon && <span className={styles.triggerIcon}>{opt.icon}</span>}
                  <span className={styles.itemLabel}>{opt.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
