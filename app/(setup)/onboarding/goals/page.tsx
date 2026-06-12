"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../setup.module.css";
import { INITIAL_FORM_DATA, TARGET_ROLES } from "@/app/lib/constants/onboarding";

export default function GoalsSetupPage() {
  const router = useRouter();
  const [data, setData] = useState({ ...INITIAL_FORM_DATA });

  const toggleTargetRole = (role: string) => {
    setData((prev) => {
      const selected = prev.targetRoles.includes(role);
      if (selected) {
        return { ...prev, targetRoles: prev.targetRoles.filter((r) => r !== role) };
      }
      if (prev.targetRoles.length < 5) {
        return { ...prev, targetRoles: [...prev.targetRoles, role] };
      }
      return prev;
    });
  };

  const handleFinish = () => {
    // In a real app, save to context/store/API
    router.push("/onboarding/success");
  };

  const handleBack = () => {
    router.push("/onboarding/profile");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Goals</h1>
        <p className={styles.subtitle}>A little bit about you.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
          Primary Career Goal
        </h2>
        <div className={styles.field}>
          <input 
            className={styles.input} 
            placeholder="Placeholder" 
            value={data.primaryGoal}
            onChange={(e) => setData({ ...data, primaryGoal: e.target.value })}
          />
          <p style={{ fontSize: "12px", color: "#A0A0A0", marginTop: "4px" }}>
            Example: Land a Software Engineering Role, Become a Business Analyst
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          Target Roles <span style={{ fontSize: "12px", color: "#A0A0A0", fontWeight: "normal" }}>(Select up to 5)</span>
        </h2>
        <div className={styles.chipContainer} style={{ border: "none", padding: "0", gap: "12px" }}>
          {TARGET_ROLES.map((role) => {
            const isSelected = data.targetRoles.includes(role);
            return (
              <button
                key={role}
                className={`${styles.chipSelectable} ${isSelected ? styles.chipSelected : ""}`}
                onClick={() => toggleTargetRole(role)}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Goal Review Timeline
        </h2>
        <div className={styles.row}>
          <div 
            className={`${styles.checkboxCard} ${data.goalTimeline === "6-months" ? styles.checkboxCardActive : ""}`}
            onClick={() => setData({ ...data, goalTimeline: "6-months" })}
          >
            <input 
              type="radio" 
              className={styles.checkboxInput} 
              checked={data.goalTimeline === "6-months"}
              readOnly
            />
            <span className={styles.checkboxLabel}>We&apos;ll remind you in 6 months</span>
          </div>
          <div 
            className={`${styles.checkboxCard} ${data.goalTimeline === "1-year" ? styles.checkboxCardActive : ""}`}
            onClick={() => setData({ ...data, goalTimeline: "1-year" })}
          >
            <input 
              type="radio" 
              className={styles.checkboxInput} 
              checked={data.goalTimeline === "1-year"}
              readOnly
            />
            <span className={styles.checkboxLabel}>We&apos;ll remind you once a year</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.backBtn} onClick={handleBack}>
          Back
        </button>
        <button className={styles.finishBtn} onClick={handleFinish}>
          Finish
        </button>
      </div>
    </div>
  );
}
