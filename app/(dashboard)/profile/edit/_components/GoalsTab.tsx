import React from "react";
import Select from "@/app/components/ui/Select";
import styles from "./Tab.module.css";
import goalsStyles from "./GoalsTab.module.css";

interface GoalsTabProps {
  currentGoals: string;
  primaryGoal: string;
  goalTimeline: string[];
  onChange: (field: string, value: string | string[]) => void;
}

const GOAL_OPTIONS = [
  { value: "Skillbuilding", label: "Skillbuilding" },
  { value: "Networking", label: "Networking" },
  { value: "Job Search", label: "Job Search" },
  { value: "Mentorship", label: "Mentorship" },
  { value: "Other", label: "Other" },
];

export default function GoalsTab({
  currentGoals,
  primaryGoal,
  goalTimeline,
  onChange,
}: GoalsTabProps) {
  
  const toggleTimeline = (value: string) => {
    if (goalTimeline.includes(value)) {
      onChange("goalTimeline", goalTimeline.filter(t => t !== value));
    } else {
      onChange("goalTimeline", [...goalTimeline, value]);
    }
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitle}>Current Goals</h2>
        <p className={styles.tabSubtitle}>Add goals that represent your trajectory</p>
      </div>

      <div className={styles.formSection}>
        {/* Working Towards */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>What are you working towards right now?</label>
          <textarea
            className={styles.textareaInput}
            value={currentGoals}
            onChange={(e) => onChange("currentGoals", e.target.value)}
            placeholder="E.g., Preparing applications for the Schwarzman Scholars..."
          />
        </div>

        {/* Primary Goal */}
        <div className={styles.fieldGroup} style={{ position: 'relative', zIndex: 2 }}>
          <label className={styles.fieldLabel}>Primary Goal</label>
          <Select
            id="primary-goal-select"
            options={GOAL_OPTIONS}
            value={primaryGoal}
            onChange={(val) => onChange("primaryGoal", val)}
            placeholder="Select Goal"
            isTransparent={false}
          />
        </div>

        {/* Goal Timeline */}
        <div className={styles.fieldGroup} style={{ position: 'relative', zIndex: 1, marginTop: '16px' }}>
          <label className={styles.fieldLabel}>Goal Timeline</label>
          <div className={goalsStyles.timelineGrid}>
            
            {/* 6 months */}
            <div 
              className={goalsStyles.checkboxCard}
              onClick={() => toggleTimeline("6_months")}
            >
              <div className={goalsStyles.checkboxWrapper}>
                <input 
                  type="checkbox" 
                  checked={goalTimeline.includes("6_months")}
                  readOnly
                  className={goalsStyles.checkbox}
                />
                <div className={goalsStyles.customCheckbox}>
                  {goalTimeline.includes("6_months") && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <div className={goalsStyles.checkboxText}>
                <span className={goalsStyles.checkboxTitle}>Every 6 months</span>
                <span className={goalsStyles.checkboxSubtitle}>We'll remind you in 6 months</span>
              </div>
            </div>

            {/* 12 months */}
            <div 
              className={goalsStyles.checkboxCard}
              onClick={() => toggleTimeline("12_months")}
            >
              <div className={goalsStyles.checkboxWrapper}>
                <input 
                  type="checkbox" 
                  checked={goalTimeline.includes("12_months")}
                  readOnly
                  className={goalsStyles.checkbox}
                />
                <div className={goalsStyles.customCheckbox}>
                  {goalTimeline.includes("12_months") && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <div className={goalsStyles.checkboxText}>
                <span className={goalsStyles.checkboxTitle}>Every 12 months</span>
                <span className={goalsStyles.checkboxSubtitle}>We'll remind you once a year</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
