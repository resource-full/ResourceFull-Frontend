"use client";

import AdminPageHeader from "../../../_components/AdminPageHeader";
import AdminTable, { AdminTableColumn } from "../../../_components/AdminTable";
import tableStyles from "../../../_components/AdminTable.module.css";
import styles from "./page.module.css";

interface AdminPathwayRow {
  id: string;
  name: string;
  author: string;
  industry: string;
  price: string;
  status: "Published" | "Draft" | "Suspended";
  resourceCount: number;
  createdDate: string;
}

const PATHWAYS: AdminPathwayRow[] = [
  { id: "1", name: "Become a Full Stack Developer in 3 Months", author: "Stella Della", industry: "Software Development", price: "$120", status: "Published", resourceCount: 20, createdDate: "Jan 13, 2026" },
  { id: "2", name: "Land a Product Design Role in 6 Weeks", author: "Grace Mensah", industry: "Product Design", price: "Free", status: "Published", resourceCount: 14, createdDate: "Jan 10, 2026" },
  { id: "3", name: "Break Into Data Science", author: "Fatima Bello", industry: "Data Science", price: "$95", status: "Draft", resourceCount: 18, createdDate: "Jan 7, 2026" },
  { id: "4", name: "Marketing Fellowship Roadmap", author: "Tunde Adeyemi", industry: "Marketing", price: "Free", status: "Published", resourceCount: 10, createdDate: "Jan 4, 2026" },
  { id: "5", name: "Finance Analyst Career Track", author: "Emeka Nwosu", industry: "Finance", price: "$60", status: "Published", resourceCount: 16, createdDate: "Dec 30, 2025" },
  { id: "6", name: "UI/UX Design Foundations", author: "Aisha Suleiman", industry: "Product Design", price: "Free", status: "Suspended", resourceCount: 12, createdDate: "Dec 22, 2025" },
];

const columns: AdminTableColumn<AdminPathwayRow>[] = [
  { key: "name", label: "Name", render: (row) => <div className={tableStyles.cellPrimary}>{row.name}</div> },
  { key: "author", label: "Author", render: (row) => row.author },
  { key: "industry", label: "Industry", render: (row) => row.industry },
  { key: "price", label: "Price", render: (row) => row.price },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span className={`${tableStyles.statusBadge} ${row.status === "Published" ? tableStyles.statusPublished : row.status === "Draft" ? tableStyles.statusDraft : tableStyles.statusSuspended}`}>
        {row.status}
      </span>
    ),
  },
  { key: "resourceCount", label: "Resources", render: (row) => row.resourceCount },
  { key: "createdDate", label: "Created", render: (row) => row.createdDate },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className={tableStyles.actionsCell}>
        <button className={tableStyles.actionBtn}>View</button>
        <button className={`${tableStyles.actionBtn} ${tableStyles.actionBtnDanger}`}>Remove</button>
      </div>
    ),
  },
];

export default function AdminPathwaysPage() {
  return (
    <div className={styles.pageContainer}>
      <AdminPageHeader title="Pathways" subtitle="All career pathways on the platform" />
      <AdminTable
        countLabel={`All Pathways (${PATHWAYS.length.toLocaleString()}+)`}
        sortOptions={["Newest", "Most resources", "Name"]}
        columns={columns}
        rows={PATHWAYS}
        searchPlaceholder="Search pathways"
        getSearchText={(row) => `${row.name} ${row.author}`}
      />
    </div>
  );
}
