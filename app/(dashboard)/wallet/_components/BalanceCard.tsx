"use client";

import { useEffect, useState } from "react";
import styles from "./BalanceCard.module.css";
import { walletAPI } from "@/app/lib/api/wallet";
import { WalletOverview, WithdrawalAccount } from "@/app/lib/types/wallet";

function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object") {
    const e = err as { response?: { data?: { message?: string } }; message?: string };
    return e.response?.data?.message || e.message || fallback;
  }
  return fallback;
}

function toAccountList(data: unknown): WithdrawalAccount[] {
  if (Array.isArray(data)) return data as WithdrawalAccount[];
  if (data && typeof data === "object" && Array.isArray((data as { accounts?: WithdrawalAccount[] }).accounts)) {
    return (data as { accounts: WithdrawalAccount[] }).accounts;
  }
  return [];
}

export default function BalanceCard() {
  const [overview, setOverview] = useState<WalletOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  // Withdraw modal state
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState<WithdrawalAccount[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState<string | null>(null);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setOverviewError(null);
        const res = await walletAPI.getOverview();
        if (res.success) {
          setOverview(res.data);
        } else {
          setOverviewError("Failed to load wallet overview.");
        }
      } catch (err) {
        setOverviewError(getErrorMessage(err, "Failed to load wallet overview."));
        console.error("Failed to load wallet overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, [refreshKey]);

  const formatCurrency = (val?: number) => {
    if (loading) return "...";
    return val !== undefined ? `$${val.toLocaleString()}` : "$0";
  };

  const handleOpenModal = async () => {
    setShowModal(true);
    setWithdrawSuccess(null);
    setWithdrawError(null);
    setAmount("");
    setSelectedAccountId("");
    setAccountsLoading(true);
    try {
      const res = await walletAPI.getAccounts();
      if (res.success && res.data) {
        const list = toAccountList(res.data);
        setAccounts(list);
        const def = list.find((a: WithdrawalAccount) => a.isDefault);
        setSelectedAccountId(def ? def._id : list[0]?._id || "");
      }
    } catch (err) {
      setWithdrawError(getErrorMessage(err, "Failed to load payout accounts."));
    } finally {
      setAccountsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWithdrawError(null);
    setWithdrawSuccess(null);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawSuccess(null);
    setWithdrawError(null);

    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setWithdrawError("Please enter a valid amount.");
      return;
    }
    if (!selectedAccountId) {
      setWithdrawError("Please select a payout account.");
      return;
    }
    const available = overview?.availableBalance ?? 0;
    if (numericAmount > available) {
      setWithdrawError("Amount exceeds available balance.");
      return;
    }

    setWithdrawing(true);
    try {
      const res = await walletAPI.requestWithdrawal({
        amount: numericAmount,
        accountId: selectedAccountId,
      });
      if (res.success) {
        setWithdrawSuccess(res.message || "Withdrawal requested successfully.");
        // Refresh the overview balance
        setRefreshKey((k) => k + 1);
        setAmount("");
      } else {
        setWithdrawError(res.message || "Failed to request withdrawal.");
      }
    } catch (err) {
      setWithdrawError(getErrorMessage(err, "Failed to request withdrawal."));
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <>
      <div className={styles.card}>
        {overviewError && (
          <div className={styles.errorMessage} role="alert">{overviewError}</div>
        )}
        <div className={styles.topRow}>
          <div className={styles.balanceInfo}>
            <span className={styles.label}>Available to withdraw</span>
            <h2 className={styles.amount}>{formatCurrency(overview?.availableBalance)}</h2>
            <p className={styles.subtitle}>Manage your earnings, withdrawals, and payout accounts</p>
          </div>
          <button className={styles.withdrawBtn} disabled={loading} onClick={handleOpenModal}>Withdraw Funds</button>
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

      {/* Withdraw modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Withdraw funds">
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Withdraw Funds</h3>
              <button className={styles.modalClose} onClick={handleCloseModal} aria-label="Close">&times;</button>
            </div>

            <div className={styles.modalBody}>
              {withdrawSuccess ? (
                <div className={styles.successMessage} role="status">{withdrawSuccess}</div>
              ) : (
                <form onSubmit={handleWithdraw} className={styles.withdrawForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="withdraw-amount">Amount (USD)</label>
                    <input
                      id="withdraw-amount"
                      className={styles.formInput}
                      type="number"
                      min="1"
                      step="any"
                      placeholder="e.g. 100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      autoFocus
                    />
                    <span className={styles.formHint}>Available: {formatCurrency(overview?.availableBalance)}</span>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="withdraw-account">Payout account</label>
                    {accountsLoading ? (
                      <div className={styles.formHint}>Loading accounts...</div>
                    ) : accounts.length === 0 ? (
                      <div className={styles.formHint}>No payout accounts found. Add one in the Payout Accounts section.</div>
                    ) : (
                      <select
                        id="withdraw-account"
                        className={styles.formSelect}
                        value={selectedAccountId}
                        onChange={(e) => setSelectedAccountId(e.target.value)}
                      >
                        {accounts.map((acc) => (
                          <option key={acc._id} value={acc._id}>
                            {acc.bankName} ••••{acc.accountNumber.slice(-4)}
                            {acc.isDefault ? " (Default)" : ""}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {withdrawError && <div className={styles.errorMessage} role="alert">{withdrawError}</div>}

                  <div className={styles.modalActions}>
                    <button type="button" className={styles.cancelBtn} onClick={handleCloseModal} disabled={withdrawing}>
                      Cancel
                    </button>
                    <button type="submit" className={styles.submitBtn} disabled={withdrawing || accounts.length === 0}>
                      {withdrawing ? "Processing..." : "Request Withdrawal"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
