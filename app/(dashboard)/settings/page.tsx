"use client";

import { useState, useEffect } from "react";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import SettingsSidebar, { SettingsTab } from "./_components/SettingsSidebar";
import PersonalizationTab from "./_components/PersonalizationTab";
import AudienceFitTab from "./_components/AudienceFitTab";
import styles from "./page.module.css";
import { userAPI } from "@/app/lib/api/user";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile settings state
  const [formData, setFormData] = useState({
    username: "",
    socials: {
      linkedin: "",
      x: "",
      instagram: "",
      facebook: ""
    },
    targetRoles: [] as string[],
    industry: [] as string[],
    experience: [] as string[],
    skills: [] as string[]
  });
  
  // Header filter state (required by DashboardHeader but maybe unused on Settings page)
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await userAPI.getUserProfile();
        const data = response.data;
        setFormData({
          username: data.name || "",
          socials: {
            linkedin: data.socials?.linkedin || "",
            x: data.socials?.x || "",
            instagram: data.socials?.instagram || "",
            facebook: data.socials?.facebook || ""
          },
          targetRoles: data.targetRoles || [],
          industry: data.industry ? [data.industry] : [],
          experience: data.professionalExperience ? [data.professionalExperience] : [],
          skills: data.skills || []
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await userAPI.updateUserProfile({
        name: formData.username,
        socials: formData.socials,
        targetRoles: formData.targetRoles,
        industry: formData.industry[0] || "",
        professionalExperience: formData.experience[0] || "",
        skills: formData.skills
      });
      alert("Settings saved successfully");
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className={styles.placeholderTab}>
          Loading...
        </div>
      );
    }

    switch (activeTab) {
      case "personalization":
        return <PersonalizationTab formData={formData} setFormData={setFormData} />;
      case "audience-fit":
        return <AudienceFitTab formData={formData} setFormData={setFormData} />;
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
        
        <button 
          className={`${styles.saveButton} ${styles.saveButtonActive}`}
          onClick={handleSave}
          disabled={isSaving || isLoading}
        >
          {isSaving ? "Saving..." : "Save"}
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