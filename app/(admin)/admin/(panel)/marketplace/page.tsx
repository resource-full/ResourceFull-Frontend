"use client";

import AdminPageHeader from "../../../_components/AdminPageHeader";
import AdminTable, { AdminTableColumn } from "../../../_components/AdminTable";
import tableStyles from "../../../_components/AdminTable.module.css";
import dashStyles from "../dashboard/page.module.css";
import styles from "./page.module.css";

interface AdminTransactionRow {
  id: string;
  reference: string;
  user: string;
  item: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
  date: string;
}

const METRICS = [
  { label: "Total Revenue", value: "₦18.2M", delta: "18%", up: true, color: "#0d5010" },
  { label: "Transactions", value: "3,420", delta: "12%", up: true, color: "#300d50" },
  { label: "Avg. Order Value", value: "₦5,320", delta: "3%", up: false, color: "#0d504f" },
  { label: "Pending Payouts", value: "₦820,000", delta: "6%", up: true, color: "#502b0d" },
];

const TRANSACTIONS: AdminTransactionRow[] = [
  { id: "1", reference: "TXN_1792340848190", user: "Adaeze Okafor", item: "Graphic Designer 80% wining rate CV", amount: "₦18,200", status: "Success", date: "Jan 14, 2026" },
  { id: "2", reference: "TXN_1792340848191", user: "Chidi Umeh", item: "Become a Full Stack Developer in 3 Months", amount: "₦48,000", status: "Success", date: "Jan 13, 2026" },
  { id: "3", reference: "TXN_1792340848192", user: "Fatima Bello", item: "Data Analyst Resume Pack", amount: "₦9,500", status: "Pending", date: "Jan 12, 2026" },
  { id: "4", reference: "TXN_1792340848193", user: "Tunde Adeyemi", item: "Marketing Fellowship Application Kit", amount: "₦15,750", status: "Success", date: "Jan 10, 2026" },
  { id: "5", reference: "TXN_1792340848194", user: "Emeka Nwosu", item: "Finance Analyst Career Track", amount: "₦24,000", status: "Failed", date: "Jan 8, 2026" },
];

function Delta({ delta, up }: { delta: string; up: boolean }) {
  return <span style={{ color: up ? "#1cab22" : "#ab1c3a", fontSize: "10px", fontWeight: 500 }}>{up ? "↑" : "↓"} {delta} vs last period</span>;
}

const columns: AdminTableColumn<AdminTransactionRow>[] = [
  { key: "reference", label: "Reference", render: (row) => row.reference },
  { key: "user", label: "User", render: (row) => row.user },
  { key: "item", label: "Item", render: (row) => row.item },
  { key: "amount", label: "Amount", render: (row) => row.amount },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span className={`${tableStyles.statusBadge} ${row.status === "Success" ? tableStyles.statusPublished : row.status === "Pending" ? tableStyles.statusDraft : tableStyles.statusSuspended}`}>
        {row.status}
      </span>
    ),
  },
  { key: "date", label: "Date", render: (row) => row.date },
];

export default function AdminMarketplacePage() {
  return (
    <div className={styles.pageContainer}>
      <AdminPageHeader title="Marketplace" subtitle="Financial dashboard and transaction management" />

      <div className={dashStyles.card}>
        <h2 className={dashStyles.cardTitle}>Overview</h2>
        <div className={dashStyles.metricGrid}>
          {METRICS.map((m) => (
            <div key={m.label} className={dashStyles.metricBox}>
              <span className={dashStyles.metricLabel} style={{ color: m.color }}>{m.label}</span>
              <span className={dashStyles.metricValue}>{m.value}</span>
              <Delta delta={m.delta} up={m.up} />
            </div>
          ))}
        </div>
      </div>

      <AdminTable
        countLabel={`Recent Transactions (${TRANSACTIONS.length})`}
        sortOptions={["Newest", "Highest amount"]}
        columns={columns}
        rows={TRANSACTIONS}
        searchPlaceholder="Search transactions"
        getSearchText={(row) => `${row.user} ${row.item} ${row.reference}`}
      />
    </div>
  );
}
