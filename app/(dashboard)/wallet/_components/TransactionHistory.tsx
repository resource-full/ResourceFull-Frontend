"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./TransactionHistory.module.css";

// Icons
const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7017 13.1812C13.3005 13.1812 13.7858 13.6665 13.7858 14.2652C13.7858 14.8639 13.3005 15.3493 12.7017 15.3493H5.13876C4.54004 15.3493 4.05469 14.8639 4.05469 14.2652C4.05469 13.6665 4.54004 13.1812 5.13876 13.1812H12.7017Z" fill="#024A94" />
    <path d="M15.853 9.98313C16.4517 9.98313 16.937 10.4685 16.9371 11.0672C16.9371 11.6659 16.4517 12.1513 15.853 12.1513H5.13876C4.54004 12.1513 4.05469 11.6659 4.05469 11.0672C4.0547 10.4685 4.54006 9.98313 5.13876 9.98313H15.853Z" fill="#024A94" />
    <path d="M15.8619 6.84086C16.4607 6.84086 16.946 7.32622 16.946 7.92494C16.946 8.52365 16.4607 9.00901 15.8619 9.00901H5.14773C4.54902 9.009 4.06365 8.52364 4.06365 7.92494C4.06365 7.32623 4.54902 6.84088 5.14773 6.84086H15.8619Z" fill="#024A94" />
    <path d="M15.853 3.68066C16.4517 3.68067 16.9371 4.16602 16.9371 4.76474C16.9371 5.36346 16.4517 5.84881 15.853 5.84882H5.13876C4.54004 5.84882 4.05469 5.36346 4.05469 4.76474C4.05469 4.16602 4.54004 3.68066 5.13876 3.68066H15.853Z" fill="#024A94" />
  </svg>

);

const CardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16406 2.91699H15.8307C17.2114 2.91699 18.3307 4.03628 18.3307 5.41699V5.83366H1.66406V5.41699C1.66406 4.03628 2.78335 2.91699 4.16406 2.91699Z" fill="black" />
    <path fillRule="evenodd" clipRule="evenodd" d="M1.66406 7.50033V14.5837C1.66406 15.9644 2.78335 17.0837 4.16406 17.0837H12.3006C11.9048 16.6414 11.6641 16.0573 11.6641 15.417C11.6641 14.6651 11.996 13.9908 12.5213 13.5325C12.5057 13.4688 12.4974 13.4022 12.4974 13.3337C12.4974 12.8734 12.8705 12.5003 13.3307 12.5003H14.9974C15.106 12.5003 15.2098 12.5211 15.305 12.5589C15.3821 12.4674 15.4666 12.3803 15.5587 12.2985C16.3432 11.6011 17.4446 11.4876 18.3307 11.9267V7.50033H1.66406ZM3.33073 13.3337C3.33073 12.8734 3.70383 12.5003 4.16406 12.5003H10.8307C11.291 12.5003 11.6641 12.8734 11.6641 13.3337C11.6641 13.7939 11.291 14.167 10.8307 14.167H4.16406C3.70383 14.167 3.33073 13.7939 3.33073 13.3337Z" fill="black" />
    <path d="M17.8425 17.2206L18.9536 15.9706C19.2342 15.6549 19.2342 15.1791 18.9536 14.8634L17.8425 13.6134C17.5367 13.2694 17.01 13.2384 16.666 13.5442C16.3651 13.8116 16.3037 14.2482 16.4977 14.5837H14.1641C13.7038 14.5837 13.3307 14.9568 13.3307 15.417C13.3307 15.8772 13.7038 16.2503 14.1641 16.2503H16.4977C16.3037 16.5857 16.3651 17.0223 16.666 17.2898C17.01 17.5956 17.5367 17.5646 17.8425 17.2206Z" fill="black" />
  </svg>
);

const PathwayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.3488 4.5332C13.0336 4.53321 13.6903 4.80526 14.1745 5.28946C14.6587 5.77366 14.9307 6.43037 14.9307 7.11512C14.9307 7.79988 14.6587 8.45663 14.1745 8.94084C13.6903 9.42504 13.0336 9.6971 12.3488 9.6971H6.71547C6.27971 9.6971 5.86174 9.87017 5.55361 10.1783C5.24548 10.4864 5.07241 10.9044 5.07241 11.3402C5.07241 11.7759 5.24549 12.1938 5.55361 12.502C5.86174 12.8101 6.27971 12.9832 6.71547 12.9832H12.2349C12.381 12.5717 12.6509 12.2154 13.0075 11.9633C13.3641 11.7112 13.7899 11.5755 14.2266 11.5749C14.6139 11.5749 14.9937 11.6813 15.3246 11.8826C15.6555 12.0839 15.9246 12.3723 16.1027 12.7162C16.2807 13.0601 16.3608 13.4464 16.3341 13.8328C16.3074 14.2191 16.1751 14.5907 15.9515 14.907C15.7279 15.2232 15.4216 15.4719 15.0663 15.6258C14.7109 15.7798 14.32 15.833 13.9364 15.7798C13.5528 15.7266 13.1912 15.569 12.8911 15.3241C12.591 15.0793 12.364 14.7566 12.2349 14.3915H6.71547C5.9062 14.3915 5.13006 14.07 4.55782 13.4978C3.98558 12.9256 3.66407 12.1494 3.66406 11.3402C3.66406 10.5309 3.98557 9.75476 4.55782 9.18251C5.13007 8.61026 5.90619 8.28875 6.71547 8.28875H12.3488C12.66 8.28875 12.9586 8.16513 13.1787 7.94504C13.3987 7.72495 13.5224 7.42638 13.5224 7.11512C13.5224 6.80387 13.3987 6.50534 13.1787 6.28526C12.9586 6.06517 12.66 5.94155 12.3488 5.94155H6.71547C6.52871 5.94155 6.3496 5.86733 6.21754 5.73527C6.08549 5.60322 6.01126 5.4241 6.01126 5.23734C6.01127 5.0506 6.0855 4.87153 6.21754 4.73948C6.3496 4.60742 6.52871 4.5332 6.71547 4.5332H12.3488ZM14.496 13.0368C14.3673 12.9835 14.2258 12.9696 14.0892 12.9967C13.9526 13.0239 13.8271 13.091 13.7286 13.1894C13.6302 13.2879 13.5631 13.4134 13.5359 13.55C13.5088 13.6866 13.5227 13.8282 13.576 13.9569C13.6293 14.0855 13.7196 14.1955 13.8354 14.2729C13.9512 14.3502 14.0873 14.3915 14.2266 14.3915C14.4133 14.3915 14.5924 14.3173 14.7245 14.1853C14.8565 14.0532 14.9307 13.8741 14.9307 13.6874C14.9307 13.5481 14.8894 13.4119 14.8121 13.2961C14.7347 13.1803 14.6247 13.0901 14.496 13.0368Z" fill="#169AD8" />
  </svg>
);

// Mock Data
type TransactionStatus = "Successful" | "Failed" | "Pending";
type TransactionIconType = "list" | "card" | "pathway";

interface Transaction {
  id: string;
  icon: TransactionIconType;
  title: string;
  subtitle: string;
  amount: string;
  status: TransactionStatus;
}

interface DateGroup {
  dateHeader: string;
  transactions: Transaction[];
}

const MOCK_DATA: DateGroup[] = [
  {
    dateHeader: "May 23rd - $456 Earned",
    transactions: [
      { id: "1", icon: "list", title: "Graphic Design CV", subtitle: "Sale - Apr 24, 2025", amount: "$23", status: "Successful" },
      { id: "2", icon: "card", title: "Withdrawal to GTBank •••• 4821", subtitle: "Withdrawal - May 2, 2023", amount: "$23", status: "Failed" },
      { id: "3", icon: "pathway", title: "Growth Hacker", subtitle: "Purchase - May 3, 2025", amount: "$43", status: "Pending" },
      { id: "4", icon: "card", title: "Withdrawal to GTBank •••• 4821", subtitle: "Withdrawal - May 2, 2023", amount: "2M", status: "Successful" },
      { id: "5", icon: "list", title: "Leading text", subtitle: "1", amount: "↑ 96%", status: "Successful" },
      { id: "6", icon: "card", title: "Withdrawal to GTBank •••• 4821", subtitle: "Withdrawal - May 2, 2023", amount: "3", status: "Successful" },
    ]
  },
  {
    dateHeader: "May 23rd - $456 Earned",
    transactions: [
      { id: "7", icon: "list", title: "Graphic Design CV", subtitle: "Sale - Apr 24, 2025", amount: "$23", status: "Successful" },
      { id: "8", icon: "card", title: "Withdrawal to GTBank •••• 4821", subtitle: "Withdrawal - May 2, 2023", amount: "$23", status: "Failed" },
      { id: "9", icon: "pathway", title: "Growth Hacker", subtitle: "Purchase - May 3, 2025", amount: "$43", status: "Pending" },
    ]
  }
];

export default function TransactionHistory() {
  const [activeTab, setActiveTab] = useState("All");

  const getIcon = (type: TransactionIconType) => {
    switch (type) {
      case "list": return <div className={`${styles.iconWrapper} ${styles.iconBlue}`}><ListIcon /></div>;
      case "card": return <div className={`${styles.iconWrapper} ${styles.iconDark}`}><CardIcon /></div>;
      case "pathway": return <div className={`${styles.iconWrapper} ${styles.iconCyan}`}><PathwayIcon /></div>;
    }
  };

  const getBadgeClass = (status: TransactionStatus) => {
    switch (status) {
      case "Successful": return styles.badgeSuccess;
      case "Failed": return styles.badgeFailed;
      case "Pending": return styles.badgePending;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Transaction History</h3>

        <div className={styles.actions}>
          <div className={styles.tabs}>
            {["All", "Withdrawals", "Sales"].map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className={styles.exportBtn}>
            Export
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {MOCK_DATA.map((group, idx) => (
          <div key={idx} className={styles.dateGroup}>
            <div className={styles.dateGroupHeader}>
              {group.dateHeader}
            </div>

            <div className={styles.transactionList}>
              {group.transactions.map(txn => (
                <div key={txn.id} className={styles.transactionRow}>
                  <div className={styles.rowLeft}>
                    {getIcon(txn.icon)}
                    <div className={styles.rowDetails}>
                      <Link href="#" className={styles.rowTitle}>{txn.title}</Link>
                      <span className={styles.rowSubtitle}>{txn.subtitle}</span>
                    </div>
                  </div>
                  <div className={styles.rowRight}>
                    <span className={styles.rowAmount}>{txn.amount}</span>
                    <div className={`${styles.badge} ${getBadgeClass(txn.status)}`}>
                      {txn.status === "Successful" && txn.amount.includes("↑") ? "↑ 96%" : txn.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
