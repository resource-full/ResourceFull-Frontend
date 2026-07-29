import React from "react";
import Select from "@/app/components/ui/Select";
import styles from "./Tab.module.css";

interface AboutTabProps {
  bio: string;
  industry: string;
  experienceLevel: string;
  onChange: (field: string, value: string) => void;
}

const INDUSTRY_OPTIONS = [
  { value: "Design", label: "Design" },
  { value: "Engineering", label: "Engineering" },
  { value: "Product", label: "Product" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Data", label: "Data" },
];

const EXPERIENCE_LEVEL_OPTIONS = [
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Entry Level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Senior", label: "Senior" },
  { value: "Lead", label: "Lead" },
  { value: "Executive", label: "Executive" },
];

export default function AboutTab({
  bio,
  industry,
  experienceLevel,
  onChange,
}: AboutTabProps) {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitle}>About</h2>
        <p className={styles.tabSubtitle}>Tell people who you are and what you do</p>
      </div>

      <div className={styles.formSection}>
        {/* Bio */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Bio</label>
          <textarea
            className={styles.textareaInput}
            value={bio}
            onChange={(e) => onChange("bio", e.target.value)}
            placeholder="E.g., Senior PM at Google Lagos · Building career resources for ambitious Africans."
          />
        </div>

        {/* Industry and Experience */}
        <div className={styles.identitySection}>
          <h3 className={styles.sectionSubtitle}>Industry and Experience</h3>
          
          <div className={styles.fieldGroup} style={{ position: 'relative', zIndex: 2 }}>
            <label className={styles.fieldLabel}>Industry</label>
            <Select
              id="industry-select"
              options={INDUSTRY_OPTIONS}
              value={industry}
              onChange={(val) => onChange("industry", val)}
              placeholder="Select Industry"
              isTransparent={false}
            />
          </div>

          <div className={styles.fieldGroup} style={{ position: 'relative', zIndex: 1, marginTop: '16px' }}>
            <label className={styles.fieldLabel}>Experience Level</label>
            <Select
              id="experience-level-select"
              options={EXPERIENCE_LEVEL_OPTIONS}
              value={experienceLevel}
              onChange={(val) => onChange("experienceLevel", val)}
              placeholder="Select Experience Level"
              isTransparent={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
