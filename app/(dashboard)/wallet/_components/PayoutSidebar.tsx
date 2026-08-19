"use client";

import { useEffect, useState } from "react";
import styles from "./PayoutSidebar.module.css";
import { walletAPI } from "@/app/lib/api/wallet";
import { WithdrawalAccount, MonthlySummary } from "@/app/lib/types/wallet";

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const BankIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="4" fill="#F0F0F0" />
    <path d="M20 12L10 18H30L20 12Z" fill="#333" />
    <rect x="12" y="20" width="3" height="8" fill="#333" />
    <rect x="18.5" y="20" width="3" height="8" fill="#333" />
    <rect x="25" y="20" width="3" height="8" fill="#333" />
    <rect x="10" y="29" width="20" height="2" fill="#333" />
  </svg>
);

export default function PayoutSidebar() {
  const [accounts, setAccounts] = useState<WithdrawalAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [summary, setSummary] = useState<MonthlySummary | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await walletAPI.getAccounts();
        if (res.success && res.data) {
          setAccounts(Array.isArray(res.data) ? res.data : (res.data as any).accounts || []);
        }
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      } finally {
        setLoadingAccounts(false);
      }
    };
    fetchAccounts();

    const fetchSummary = async () => {
      try {
        const d = new Date();
        const res = await walletAPI.getMonthlySummary(d.getFullYear(), d.getMonth() + 1);
        if (res.success && res.data) {
          setSummary(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch monthly summary", err);
      }
    };
    fetchSummary();
  }, []);

  const handleSetDefault = async (id: string) => {
    try {
      await walletAPI.setDefaultAccount(id);
      setAccounts(accounts.map(acc => ({
        ...acc,
        isDefault: acc._id === id
      })));
    } catch (error) {
      console.error("Failed to set default account", error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.card}>
        <h3 className={styles.title}>Payout Accounts</h3>

        <div className={styles.accountsList}>
          {loadingAccounts ? (
            <div>Loading accounts...</div>
          ) : Array.isArray(accounts) && accounts.length === 0 ? (
            <div>No accounts added.</div>
          ) : Array.isArray(accounts) ? accounts.map((acc) => (
            <div key={acc._id} className={styles.accountRow}>
              <div className={styles.accountInfo}>
                <BankIcon />
                <div className={styles.accountDetails}>
                  <span className={styles.bankName}>{acc.bankName}</span>
                  <span className={styles.accountNumber}>••••••{acc.accountNumber.slice(-4)}</span>
                </div>
              </div>
              <div className={styles.accountActions}>
                {acc.isDefault ? (
                  <span className={styles.defaultBadge}>Default</span>
                ) : (
                  <button className={styles.setDefault} onClick={() => handleSetDefault(acc._id)}>Set as default</button>
                )}
                <button className={styles.deleteBtn} aria-label="Delete account">
                  <TrashIcon />
                </button>
              </div>
            </div>
          )) : null}
        </div>

        <button className={styles.addAccount}>
          <PlusIcon /> Add another account
        </button>
      </div>

      <div className={styles.card}>
        <h3 className={styles.title}>Payout schedule</h3>

        <div className={styles.scheduleList}>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleLabel}>Next payout date</span>
            <span className={styles.scheduleValue}>Apr 30, 2026</span>
          </div>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleLabel}>Projected amount</span>
            <span className={styles.scheduleValue}>${summary?.totalEarned || 0}</span>
          </div>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleLabel}>Payout account</span>
            <span className={styles.scheduleValue}>
              {Array.isArray(accounts) ? (accounts.find(a => a.isDefault)?.bankName || 'None') : 'None'} •••• {Array.isArray(accounts) ? (accounts.find(a => a.isDefault)?.accountNumber.slice(-4) || '----') : '----'}
            </span>
          </div>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleLabel}>Payout frequency</span>
            <span className={styles.scheduleValue}>Monthly</span>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Minimum Payout</span>
            <span className={styles.progressValue}>$200</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${Math.min(100, ((summary?.totalEarned || 0) / 200) * 100)}%` }}></div>
          </div>
          <div style={{ textAlign: "right", marginTop: "-4px" }}>
            <span className={styles.progressValues} style={{ fontSize: "10px" }}>
              {Math.min(100, Math.round(((summary?.totalEarned || 0) / 200) * 100))}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
