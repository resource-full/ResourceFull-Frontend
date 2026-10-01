"use client";

import { useEffect, useState } from "react";
import styles from "./PayoutSidebar.module.css";
import { walletAPI } from "@/app/lib/api/wallet";
import { WithdrawalAccount, MonthlySummary, Bank } from "@/app/lib/types/wallet";

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

function toBankList(data: unknown): Bank[] {
  if (Array.isArray(data)) return data as Bank[];
  if (data && typeof data === "object" && Array.isArray((data as { banks?: Bank[] }).banks)) {
    return (data as { banks: Bank[] }).banks;
  }
  return [];
}

function toAccount(data: unknown): WithdrawalAccount | null {
  if (data && typeof data === "object" && typeof (data as WithdrawalAccount)._id === "string") {
    return data as WithdrawalAccount;
  }
  return null;
}

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
  const [accountsError, setAccountsError] = useState<string | null>(null);
  const [summary, setSummary] = useState<MonthlySummary | null>(null);

  // Add-account form state
  const [showForm, setShowForm] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [banksLoading, setBanksLoading] = useState(false);
  const [banksError, setBanksError] = useState<string | null>(null);
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [adding, setAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  // Set-default state
  const [defaultError, setDefaultError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setAccountsError(null);
        const res = await walletAPI.getAccounts();
        if (res.success && res.data) {
          setAccounts(toAccountList(res.data));
        } else {
          setAccountsError("No accounts data received.");
        }
      } catch (err) {
        setAccountsError(getErrorMessage(err, "Failed to load accounts."));
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

  const loadBanks = async () => {
    if (banks.length > 0) return;
    setBanksLoading(true);
    setBanksError(null);
    try {
      const res = await walletAPI.getBanksList();
      if (res.success && res.data) {
        const loadedBanks = toBankList(res.data);
        setBanks(loadedBanks);
        if (loadedBanks.length === 0) {
          setBanksError("No banks available.");
        }
      } else {
        setBanksError("Failed to load banks.");
      }
    } catch (err) {
      setBanksError(getErrorMessage(err, "Failed to load banks."));
    } finally {
      setBanksLoading(false);
    }
  };

  const handleOpenForm = () => {
    setAddSuccess(null);
    setAddError(null);
    setSelectedBankCode("");
    setAccountNumber("");
    setAccountName("");
    setShowForm(true);
    loadBanks();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setAddError(null);
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddSuccess(null);
    setAddError(null);

    if (!selectedBankCode) {
      setAddError("Please select a bank.");
      return;
    }
    if (!accountNumber.trim()) {
      setAddError("Account number is required.");
      return;
    }
    if (!accountName.trim()) {
      setAddError("Account name is required.");
      return;
    }

    setAdding(true);
    try {
      const res = await walletAPI.addWithdrawalAccount({
        bankCode: selectedBankCode,
        accountNumber: accountNumber.trim(),
        accountName: accountName.trim(),
      });
      if (res.success) {
        const bank = banks.find((b) => b.code === selectedBankCode);
        const existing = toAccount(res.data);
        const newAccount: WithdrawalAccount = existing
          ? existing
          : {
                _id: `local-${Date.now()}`,
                bankName: bank?.name || selectedBankCode,
                accountNumber: accountNumber.trim(),
                accountName: accountName.trim(),
                isDefault: accounts.length === 0,
              };
        setAccounts((prev) => [...prev, newAccount]);
        setAddSuccess("Payout account added successfully.");
        setShowForm(false);
        setSelectedBankCode("");
        setAccountNumber("");
        setAccountName("");
      } else {
        setAddError(res.message || "Failed to add account.");
      }
    } catch (err) {
      setAddError(getErrorMessage(err, "Failed to add account."));
    } finally {
      setAdding(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    setDefaultError(null);
    try {
      const res = await walletAPI.setDefaultAccount(id);
      if (res.success) {
        setAccounts(accounts.map(acc => ({
          ...acc,
          isDefault: acc._id === id
        })));
      } else {
        setDefaultError(res.message || "Failed to set default account.");
      }
    } catch (error) {
      setDefaultError(getErrorMessage(error, "Failed to set default account."));
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.card}>
        <h3 className={styles.title}>Payout Accounts</h3>

        {/* Success / error banners for account loading */}
        {accountsError && (
          <div className={styles.errorMessage} role="alert">{accountsError}</div>
        )}
        {addSuccess && (
          <div className={styles.successMessage} role="status">{addSuccess}</div>
        )}

        <div className={styles.accountsList}>
          {loadingAccounts ? (
            <div className={styles.stateText}>Loading accounts...</div>
          ) : Array.isArray(accounts) && accounts.length === 0 ? (
            <div className={styles.stateText}>No accounts added.</div>
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

        {/* Inline add-account form */}
        {showForm && (
          <form className={styles.addForm} onSubmit={handleAddAccount}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="bank-select">Bank</label>
              <select
                id="bank-select"
                className={styles.formSelect}
                value={selectedBankCode}
                onChange={(e) => setSelectedBankCode(e.target.value)}
                disabled={banksLoading}
              >
                <option value="">
                  {banksLoading ? "Loading banks..." : "Select a bank"}
                </option>
                {banks.map((bank) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
              {banksError && <span className={styles.fieldError}>{banksError}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="account-number">Account Number</label>
              <input
                id="account-number"
                className={styles.formInput}
                type="text"
                placeholder="e.g. 0123456789"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="account-name">Account Name</label>
              <input
                id="account-name"
                className={styles.formInput}
                type="text"
                placeholder="e.g. John Doe"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                autoComplete="off"
              />
            </div>

            {addError && <div className={styles.errorMessage} role="alert">{addError}</div>}

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={handleCancelForm} disabled={adding}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn} disabled={adding}>
                {adding ? "Adding..." : "Add Account"}
              </button>
            </div>
          </form>
        )}

        {!showForm && (
          <button className={styles.addAccount} onClick={handleOpenForm}>
            <PlusIcon /> Add another account
          </button>
        )}
      </div>

      <div className={styles.card}>
        <h3 className={styles.title}>Payout schedule</h3>
        {defaultError && (
          <div className={styles.errorMessage} role="alert">{defaultError}</div>
        )}

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
