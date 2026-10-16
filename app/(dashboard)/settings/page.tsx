"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import SettingsSidebar, { SettingsTab } from "./_components/SettingsSidebar";
import PersonalizationTab from "./_components/PersonalizationTab";
import AudienceFitTab from "./_components/AudienceFitTab";
import BalanceCard from "../wallet/_components/BalanceCard";
import PayoutSidebar from "../wallet/_components/PayoutSidebar";
import styles from "./page.module.css";
import { userAPI } from "@/app/lib/api/user";
import { authAPI, getAuthErrorMessage } from "@/app/lib/api/auth";
import { notificationAPI } from "@/app/lib/api/notification";
import { Notification } from "@/app/lib/types/notification";

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

  // Change password state (Privacy & Security tab)
  const [pwd, setPwd] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState("");
  
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

  // Notifications tab state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState<string | null>(null);
  const [notifLoaded, setNotifLoaded] = useState(false);

  const fetchNotifications = useCallback(async () => {
    setNotifLoading(true);
    setNotifError(null);
    try {
      const res = await notificationAPI.getNotifications({ limit: 20 });
      if (res.success && res.data) {
        setNotifications(res.data.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
      setNotifError("Failed to load notifications");
    } finally {
      setNotifLoading(false);
      setNotifLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "notifications" && !notifLoaded) {
      fetchNotifications();
    }
  }, [activeTab, notifLoaded, fetchNotifications]);

  const handleMarkAllNotificationsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const handleMarkNotificationRead = async (notifId: string) => {
    const notif = notifications.find((n) => n._id === notifId);
    if (!notif || notif.isRead) return;
    try {
      await notificationAPI.markAsRead(notifId);
      setNotifications((prev) => prev.map((n) => (n._id === notifId ? { ...n, isRead: true } : n)));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess("");

    if (pwd.newPassword.length < 8) {
      setPwdError("New password must be at least 8 characters");
      return;
    }
    if (pwd.newPassword !== pwd.confirmPassword) {
      setPwdError("New passwords do not match");
      return;
    }

    setPwdLoading(true);
    try {
      const res = await authAPI.changePassword({
        oldPassword: pwd.oldPassword,
        newPassword: pwd.newPassword,
      });
      setPwdSuccess(res?.message || "Password updated successfully");
      setPwd({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setPwdError(getAuthErrorMessage(err, "Failed to update password. Please try again."));
    } finally {
      setPwdLoading(false);
    }
  };

  const renderTabContent = () => {
    if (activeTab === "privacy") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "480px" }}>
          <div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#11243d", margin: "0 0 4px" }}>
              Change Password
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#5a6474", margin: 0 }}>
              Update your account password.
            </p>
          </div>

          {pwdError && (
            <div
              role="alert"
              style={{
                color: "#dc2626",
                fontSize: "0.875rem",
                padding: "10px 12px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
              }}
            >
              {pwdError}
            </div>
          )}
          {pwdSuccess && (
            <div
              role="status"
              style={{
                color: "#16a34a",
                fontSize: "0.875rem",
                padding: "10px 12px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "8px",
              }}
            >
              {pwdSuccess}
            </div>
          )}

          <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.75rem", color: "#5a6474" }}>Current Password</label>
              <input
                type="password"
                value={pwd.oldPassword}
                onChange={(e) => setPwd({ ...pwd, oldPassword: e.target.value })}
                style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", outline: "none" }}
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.75rem", color: "#5a6474" }}>New Password</label>
              <input
                type="password"
                value={pwd.newPassword}
                onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })}
                style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", outline: "none" }}
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.75rem", color: "#5a6474" }}>Confirm New Password</label>
              <input
                type="password"
                value={pwd.confirmPassword}
                onChange={(e) => setPwd({ ...pwd, confirmPassword: e.target.value })}
                style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", outline: "none" }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={pwdLoading}
              style={{
                background: "#024A94",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: pwdLoading ? "not-allowed" : "pointer",
                opacity: pwdLoading ? 0.7 : 1,
              }}
            >
              {pwdLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      );
    }

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
      case "wallets":
        return (
          <div className={styles.walletTab}>
            <BalanceCard />
            <PayoutSidebar />
          </div>
        );
      case "notifications":
        return (
          <div className={styles.notificationsCard}>
            <div className={styles.notificationsHeader}>
              <h2 className={styles.notificationsTitle}>Notifications</h2>
              <button className={styles.markAllBtn} onClick={handleMarkAllNotificationsRead}>
                Mark all read
              </button>
            </div>
            <div className={styles.notifList}>
              {notifLoading ? (
                <div className={styles.notifEmpty}>Loading notifications...</div>
              ) : notifError ? (
                <div className={styles.notifEmpty}>{notifError}</div>
              ) : notifications.length === 0 ? (
                <div className={styles.notifEmpty}>No notifications yet.</div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif._id}
                    className={`${styles.notifItem} ${notif.isRead ? "" : styles.notifUnread}`}
                    onClick={() => handleMarkNotificationRead(notif._id)}
                  >
                    <div className={styles.notifIcon}>
                      {notif.metadata?.senderName ? notif.metadata.senderName.substring(0, 2).toUpperCase() : "RF"}
                    </div>
                    <div className={styles.notifTextGroup}>
                      <div className={styles.notifText}>{notif.message}</div>
                      <div className={styles.notifTime}>{new Date(notif.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
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
            Settings <span style={{ color: "var(--color-text-placeholder)", fontWeight: 400 }}>›</span> <span className={styles.activeTabName}>{TAB_LABELS[activeTab]}</span>
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