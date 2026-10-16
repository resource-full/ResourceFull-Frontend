"use client";

import AdminPageHeader from "../../../_components/AdminPageHeader";
import AdminTable, { AdminTableColumn } from "../../../_components/AdminTable";
import tableStyles from "../../../_components/AdminTable.module.css";
import styles from "./page.module.css";

interface AdminHubRow {
  id: string;
  name: string;
  author: string;
  industry: string;
  resourceCount: number;
  pathwayCount: number;
  status: "Published" | "Draft" | "Suspended";
  createdDate: string;
}

const HUBS: AdminHubRow[] = [
  { id: "1", name: "CV Templates Hub", author: "Stella Della", industry: "Software Development", resourceCount: 42, pathwayCount: 6, status: "Published", createdDate: "Jan 15, 2026" },
  { id: "2", name: "Product Design Essentials", author: "Grace Mensah", industry: "Product Design", resourceCount: 28, pathwayCount: 4, status: "Published", createdDate: "Jan 12, 2026" },
  { id: "3", name: "Data Science Starter Kit", author: "Fatima Bello", industry: "Data Science", resourceCount: 19, pathwayCount: 3, status: "Draft", createdDate: "Jan 9, 2026" },
  { id: "4", name: "Marketing Toolkit", author: "Tunde Adeyemi", industry: "Marketing", resourceCount: 33, pathwayCount: 5, status: "Published", createdDate: "Jan 5, 2026" },
  { id: "5", name: "Finance Career Hub", author: "Emeka Nwosu", industry: "Finance", resourceCount: 21, pathwayCount: 2, status: "Suspended", createdDate: "Dec 28, 2025" },
];

const columns: AdminTableColumn<AdminHubRow>[] = [
  { key: "name", label: "Name", render: (row) => <div className={tableStyles.cellPrimary}>{row.name}</div> },
  { key: "author", label: "Author", render: (row) => row.author },
  { key: "industry", label: "Industry", render: (row) => row.industry },
  { key: "resourceCount", label: "Resources", render: (row) => row.resourceCount },
  { key: "pathwayCount", label: "Pathways", render: (row) => row.pathwayCount },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span className={`${tableStyles.statusBadge} ${row.status === "Published" ? tableStyles.statusPublished : row.status === "Draft" ? tableStyles.statusDraft : tableStyles.statusSuspended}`}>
        {row.status}
      </span>
    ),
  },
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

export default function AdminHubsPage() {
  return (
    <div className={styles.pageContainer}>
      <AdminPageHeader title="Hubs" subtitle="All professional hubs on ResourceFull" />
      <AdminTable
        countLabel={`All Hubs (${HUBS.length.toLocaleString()}+)`}
        sortOptions={["Newest", "Most resources", "Name"]}
        columns={columns}
        rows={HUBS}
        searchPlaceholder="Search hubs"
        getSearchText={(row) => `${row.name} ${row.author}`}
      />
    </div>
  );
}
