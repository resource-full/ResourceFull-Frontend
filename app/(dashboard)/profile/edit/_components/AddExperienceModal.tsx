"use client";

import { useState } from "react";
import styles from "./ProfileModals.module.css";
import { ExperienceItem } from "./ExperienceTab";

const INDUSTRY_OPTIONS = ["Design", "Engineering", "Product", "Marketing", "Sales", "Operations"];

interface AddExperienceModalProps {
  onClose: () => void;
  onSave: (experience: Omit<ExperienceItem, "id">) => void;
}

function formatDuration(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "";

  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  months = Math.max(months, 0);
  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years}yr`);
  if (remMonths > 0 || years === 0) parts.push(`${remMonths}mos`);
  return parts.join(" ");
}

export default function AddExperienceModal({ onClose, onSave }: AddExperienceModalProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const isValid = jobTitle.trim() && company.trim() && startDate;

  const handleSave = () => {
    if (!isValid) return;
    const dateRange = `${startDate} - ${endDate || "Present"}`;
    onSave({
      title: jobTitle.trim(),
      company: company.trim(),
      type: industry || "Fulltime",
      dateRange,
      duration: formatDuration(startDate, endDate),
      location: description.trim(),
      linkedResources: [],
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} ${styles.modalWide}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.textGroup}>
          <h3 className={styles.modalTitle}>Add Experience</h3>
          <p className={styles.modalSubtitle}>Add your work experience, Increase your confidence score!</p>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <label className={styles.inputLabel} htmlFor="job-title">Job Title</label>
            <input
              id="job-title"
              type="text"
              className={styles.inputField}
              placeholder="e.g Product Manager"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className={styles.selectWrapper} style={{ flex: 1, position: "relative" }}>
            <button type="button" className={styles.selectField} onClick={() => setIsIndustryOpen(!isIndustryOpen)}>
              <span className={styles.selectLabel}>{industry || "Industry"}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isIndustryOpen && (
              <div className={styles.selectMenu}>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={styles.selectMenuItem}
                    onClick={() => { setIndustry(opt); setIsIndustryOpen(false); }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel} htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            className={styles.inputField}
            placeholder="Placeholder"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <label className={styles.inputLabel} htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              className={styles.inputField}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <label className={styles.inputLabel} htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              className={styles.inputField}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel} htmlFor="exp-description">Description</label>
          <input
            id="exp-description"
            type="text"
            className={styles.inputField}
            placeholder="Placeholder"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.modalActions}>
          <button className={styles.btnSecondary} onClick={onClose}>Cancel</button>
          <button className={styles.btnPrimary} onClick={handleSave} disabled={!isValid}>Save Experience</button>
        </div>
      </div>
    </div>
  );
}
