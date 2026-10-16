"use client";

import AdminPageHeader from "../../../_components/AdminPageHeader";
import AdminTable, { AdminTableColumn } from "../../../_components/AdminTable";
import tableStyles from "../../../_components/AdminTable.module.css";
import styles from "./page.module.css";

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  industry: string;
  experience: string;
  country: string;
  joinedDate: string;
  status: "Active" | "Suspended";
}

const USERS: AdminUserRow[] = [
  { id: "1", name: "Adaeze Okafor", email: "adaeze.okafor@gmail.com", avatar: "https://i.pravatar.cc/150?img=47", industry: "Software Development", experience: "Professional", country: "Nigeria", joinedDate: "Jan 12, 2026", status: "Active" },
  { id: "2", name: "Chidi Umeh", email: "chidi.umeh@gmail.com", avatar: "https://i.pravatar.cc/150?img=12", industry: "Product Design", experience: "Experienced", country: "Ghana", joinedDate: "Jan 10, 2026", status: "Active" },
  { id: "3", name: "Fatima Bello", email: "fatima.bello@gmail.com", avatar: "https://i.pravatar.cc/150?img=32", industry: "Data Science", experience: "Undergraduate", country: "Kenya", joinedDate: "Jan 8, 2026", status: "Active" },
  { id: "4", name: "Tunde Adeyemi", email: "tunde.adeyemi@gmail.com", avatar: "https://i.pravatar.cc/150?img=5", industry: "Marketing", experience: "Recent graduate", country: "Nigeria", joinedDate: "Jan 5, 2026", status: "Suspended" },
  { id: "5", name: "Grace Mensah", email: "grace.mensah@gmail.com", avatar: "https://i.pravatar.cc/150?img=20", industry: "Software Development", experience: "Professional", country: "Ghana", joinedDate: "Jan 2, 2026", status: "Active" },
  { id: "6", name: "Emeka Nwosu", email: "emeka.nwosu@gmail.com", avatar: "https://i.pravatar.cc/150?img=15", industry: "Finance", experience: "Experienced", country: "Nigeria", joinedDate: "Dec 29, 2025", status: "Active" },
  { id: "7", name: "Aisha Suleiman", email: "aisha.suleiman@gmail.com", avatar: "https://i.pravatar.cc/150?img=25", industry: "Product Design", experience: "Undergraduate", country: "Kenya", joinedDate: "Dec 21, 2025", status: "Active" },
  { id: "8", name: "Kwame Asante", email: "kwame.asante@gmail.com", avatar: "https://i.pravatar.cc/150?img=33", industry: "Software Development", experience: "Professional", country: "Ghana", joinedDate: "Dec 15, 2025", status: "Suspended" },
];

const columns: AdminTableColumn<AdminUserRow>[] = [
  {
    key: "name",
    label: "Name",
    render: (row) => (
      <div className={tableStyles.cellPrimary}>
        <img src={row.avatar} alt={row.name} className={tableStyles.cellAvatar} />
        {row.name}
      </div>
    ),
  },
  { key: "email", label: "Email", render: (row) => row.email },
  { key: "industry", label: "Industry", render: (row) => row.industry },
  { key: "experience", label: "Experience", render: (row) => row.experience },
  { key: "country", label: "Country", render: (row) => row.country },
  { key: "joinedDate", label: "Joined", render: (row) => row.joinedDate },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span className={`${tableStyles.statusBadge} ${row.status === "Active" ? tableStyles.statusPublished : tableStyles.statusSuspended}`}>
        {row.status}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className={tableStyles.actionsCell}>
        <button className={tableStyles.actionBtn}>View</button>
        <button className={`${tableStyles.actionBtn} ${tableStyles.actionBtnDanger}`}>Suspend</button>
      </div>
    ),
  },
];

export default function AdminUsersPage() {
  return (
    <div className={styles.pageContainer}>
      <AdminPageHeader title="Users" subtitle="Manage all registered users on ResourceFull" />
      <AdminTable
        countLabel={`All Users (${USERS.length.toLocaleString()}+)`}
        sortOptions={["Newest", "Oldest", "Name"]}
        columns={columns}
        rows={USERS}
        searchPlaceholder="Search users"
        getSearchText={(row) => `${row.name} ${row.email}`}
      />
    </div>
  );
}
