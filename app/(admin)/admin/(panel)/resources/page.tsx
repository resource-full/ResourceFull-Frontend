"use client";

import AdminPageHeader from "../../../_components/AdminPageHeader";
import AdminTable, { AdminTableColumn } from "../../../_components/AdminTable";
import tableStyles from "../../../_components/AdminTable.module.css";
import styles from "./page.module.css";

interface AdminResourceRow {
  id: string;
  name: string;
  thumbnail: string;
  owner: string;
  industry: string;
  price: string;
  status: "Published" | "Draft" | "Suspended";
  downloads: number;
  createdDate: string;
}

const RESOURCES: AdminResourceRow[] = [
  { id: "1", name: "Graphic Designer 80% wining rate CV", thumbnail: "/assets/pdf1.png", owner: "Stella Della", industry: "Design", price: "$120", status: "Published", downloads: 2480, createdDate: "Jan 14, 2026" },
  { id: "2", name: "Full Stack Developer Portfolio Template", thumbnail: "/assets/pdf1.png", owner: "Chidi Umeh", industry: "Software Development", price: "Free", status: "Published", downloads: 5120, createdDate: "Jan 11, 2026" },
  { id: "3", name: "Product Manager Interview Prep", thumbnail: "/assets/pdf1.png", owner: "Grace Mensah", industry: "Product Design", price: "$80", status: "Draft", downloads: 0, createdDate: "Jan 9, 2026" },
  { id: "4", name: "Data Analyst Resume Pack", thumbnail: "/assets/pdf1.png", owner: "Fatima Bello", industry: "Data Science", price: "Free", status: "Published", downloads: 3310, createdDate: "Jan 6, 2026" },
  { id: "5", name: "Marketing Fellowship Application Kit", thumbnail: "/assets/pdf1.png", owner: "Tunde Adeyemi", industry: "Marketing", price: "$45", status: "Published", downloads: 1890, createdDate: "Jan 3, 2026" },
  { id: "6", name: "Finance Analyst Cover Letter Guide", thumbnail: "/assets/pdf1.png", owner: "Emeka Nwosu", industry: "Finance", price: "Free", status: "Suspended", downloads: 940, createdDate: "Dec 27, 2025" },
];

const columns: AdminTableColumn<AdminResourceRow>[] = [
  {
    key: "name",
    label: "Name",
    render: (row) => (
      <div className={tableStyles.cellPrimary}>
        <img src={row.thumbnail} alt={row.name} className={tableStyles.cellThumb} />
        {row.name}
      </div>
    ),
  },
  { key: "owner", label: "Owner", render: (row) => row.owner },
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
  { key: "downloads", label: "Downloads", render: (row) => row.downloads.toLocaleString() },
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

export default function AdminResourcesPage() {
  return (
    <div className={styles.pageContainer}>
      <AdminPageHeader title="Resources" subtitle="All content uploaded to ResourceFull" />
      <AdminTable
        countLabel={`All Resources (${RESOURCES.length.toLocaleString()}+)`}
        sortOptions={["Newest", "Most downloaded", "Name"]}
        columns={columns}
        rows={RESOURCES}
        searchPlaceholder="Search resources"
        getSearchText={(row) => `${row.name} ${row.owner}`}
      />
    </div>
  );
}
