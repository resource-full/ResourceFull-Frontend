import React, { useState } from "react";
import styles from "./Tab.module.css";
import skillStyles from "./SkillsTab.module.css";

interface SkillsTabProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillsTab({ skills, onChange }: SkillsTabProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (!skills.includes(newSkill)) {
        onChange([...skills, newSkill]);
      }
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitle}>Skill</h2>
        <p className={styles.tabSubtitle}>Add skills that represent your expertise</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.fieldGroup}>
          <div className={skillStyles.inputWrapper}>
            <span className={skillStyles.searchIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0a9b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className={skillStyles.skillInput}
              placeholder="Placeholder"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <span className={skillStyles.helperText}>Click "Enter" to add skill</span>
        </div>

        <div className={skillStyles.skillsList}>
          {skills.map((skill) => (
            <div key={skill} className={skillStyles.skillChip}>
              {skill}
              <button
                type="button"
                className={skillStyles.removeSkillBtn}
                onClick={() => removeSkill(skill)}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
