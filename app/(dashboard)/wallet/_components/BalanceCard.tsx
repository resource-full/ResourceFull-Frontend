"use client";

import styles from "./BalanceCard.module.css";

export default function BalanceCard() {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.balanceInfo}>
          <span className={styles.label}>Available to withdraw</span>
          <h2 className={styles.amount}>$124,0000</h2>
          <p className={styles.subtitle}>Manage your earnings, withdrawals, and payout accounts</p>
        </div>
        <button className={styles.withdrawBtn}>Withdraw Funds</button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Earned</span>
          <span className={styles.statValue}>$300,000</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Withdrawn</span>
          <span className={styles.statValue}>$300,000</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Resources Sold</span>
          <span className={styles.statValue}>289</span>
        </div>
      </div>
    </div>
  );
}
