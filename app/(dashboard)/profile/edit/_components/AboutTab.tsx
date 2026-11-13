import React, { useEffect, useState } from "react";
import Select from "@/app/components/ui/Select";
import { userAPI } from "@/app/lib/api/user";
import styles from "./Tab.module.css";

interface AboutTabProps {
  bio: string;
  industry: string;
  experienceLevel: string;
  onChange: (field: string, value: string) => void;
}

// Backend's professionalExperience enum is case-sensitive and only has
// these 4 values ("Entry level" has a lowercase "l"); Undergraduate/Lead/
// Executive are not valid values and will 400 if sent.
const EXPERIENCE_LEVEL_OPTIONS = [
  { value: "Student", label: "Student" },
  { value: "Entry level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Senior", label: "Senior" },
];

export default function AboutTab({
  bio,
  industry,
  experienceLevel,
  onChange,
}: AboutTabProps) {
  // The valid `industry` values come from the backend itself rather than a
  // hardcoded list, since the frontend has no independent way to know which
  // strings the backend's enum actually accepts.
  const [industryOptions, setIndustryOptions] = useState<{ value: string; label: string }[]>(
    industry ? [{ value: industry, label: industry }] : []
  );

  useEffect(() => {
    userAPI.getIndustries().then((res) => {
      const list: string[] = res?.data?.industries || [];
      if (list.length > 0) {
        setIndustryOptions(list.map((name) => ({ value: name, label: name })));
      }
    }).catch(() => {});
  }, []);

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
              options={industryOptions}
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
