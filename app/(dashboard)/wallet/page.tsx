"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import BalanceCard from "./_components/BalanceCard";
import TransactionHistory from "./_components/TransactionHistory";
import PayoutSidebar from "./_components/PayoutSidebar";
import styles from "./page.module.css";

export default function WalletPage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

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
          <Link href="#" className={styles.downloadLink}>Download statement</Link>
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