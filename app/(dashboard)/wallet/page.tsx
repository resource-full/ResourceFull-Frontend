"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import BalanceCard from "./_components/BalanceCard";
import TransactionHistory from "./_components/TransactionHistory";
import PayoutSidebar from "./_components/PayoutSidebar";
import { walletAPI } from "@/app/lib/api/wallet";
import styles from "./page.module.css";

export default function WalletPage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadStatement = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const blob = await walletAPI.exportTransactions("pdf");
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "wallet-statement.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download statement", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      <div className={styles.pageHeader}>
        <div className={styles.titleGroup}>
          <h1 className={styles.pageTitle}>Wallet</h1>
          <p className={styles.pageSubtitle}>Manage your earnings, withdrawals, and payout accounts</p>
        </div>
        <div className={styles.headerLinks}>
          <Link href="/analytics" className={styles.downloadLink}>Analytics</Link>
          <button
            className={styles.downloadLink}
            onClick={handleDownloadStatement}
            disabled={isDownloading}
            style={{ background: "none", border: "none", padding: 0, cursor: isDownloading ? "default" : "pointer", fontFamily: "inherit" }}
          >
            {isDownloading ? "Downloading..." : "Download statement"}
          </button>
        </div>
      </div>

      <BalanceCard />

      <div className={styles.mainContent}>
        <TransactionHistory />
        <PayoutSidebar />
      </div>
    </div>
  );
}