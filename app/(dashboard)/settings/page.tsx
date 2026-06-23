"use client";

import { useState } from "react";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import SettingsSidebar, { SettingsTab } from "./_components/SettingsSidebar";
import PersonalizationTab from "./_components/PersonalizationTab";
import AudienceFitTab from "./_components/AudienceFitTab";
import styles from "./page.module.css";

const TAB_LABELS: Record<SettingsTab, string> = {
  "personalization": "Personalization",
  "audience-fit": "Audience Fit",
  "wallets": "Wallets & Payouts",
  "notifications": "Notifications",
  "privacy": "Privacy & Security",
};

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("personalization");
  
  // Header filter state (required by DashboardHeader but maybe unused on Settings page)
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "personalization":
        return <PersonalizationTab />;
      case "audience-fit":
        return <AudienceFitTab />;
      default:
        return (
          <div className={styles.placeholderTab}>
            This section is under construction.
          </div>
        );
    }
  };

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      <div className={styles.pageHeader}>
        <div className={styles.titleGroup}>
          <button className={styles.backButton}>
            <BackIcon />
          </button>
          <h1 className={styles.pageTitle}>
            Settings <span style={{ color: "#94a3b8", fontWeight: 400 }}>›</span> <span className={styles.activeTabName}>{TAB_LABELS[activeTab]}</span>
          </h1>
        </div>
        
        {/* Made it look active to match Figma */}
        <button className={`${styles.saveButton} ${styles.saveButtonActive}`}>
          Save
        </button>
      </div>

      <div className={styles.mainContent}>
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className={styles.tabContent}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}