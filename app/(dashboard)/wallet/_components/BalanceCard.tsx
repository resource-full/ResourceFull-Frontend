"use client";

import { useEffect, useState } from "react";
import styles from "./BalanceCard.module.css";
import { walletAPI } from "@/app/lib/api/wallet";
import { WalletOverview } from "@/app/lib/types/wallet";

export default function BalanceCard() {
  const [overview, setOverview] = useState<WalletOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await walletAPI.getOverview();
        if (res.success) {
          setOverview(res.data);
        }
      } catch (err) {
        console.error("Failed to load wallet overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  const formatCurrency = (val?: number) => {
    if (loading) return "...";
    return val !== undefined ? `$${val.toLocaleString()}` : "$0";
  };

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.balanceInfo}>
          <span className={styles.label}>Available to withdraw</span>
          <h2 className={styles.amount}>{formatCurrency(overview?.availableBalance)}</h2>
          <p className={styles.subtitle}>Manage your earnings, withdrawals, and payout accounts</p>
        </div>
        <button className={styles.withdrawBtn} disabled={loading}>Withdraw Funds</button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Earned</span>
          <span className={styles.statValue}>{formatCurrency(overview?.totalEarned)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Withdrawn</span>
          <span className={styles.statValue}>{formatCurrency(overview?.totalWithdrawn)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Resources Sold</span>
          <span className={styles.statValue}>{loading ? "..." : (overview?.resourcesSold || 0)}</span>
        </div>
      </div>
    </div>
  );
}
