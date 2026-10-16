import type { Metadata } from "next";
import AdminSidebar from "../../_components/AdminSidebar";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Admin — Resourcefull",
  description: "Platform overview and management.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className={styles.adminLayout}>
        <div className={styles.sidebarWrapper}>
          <AdminSidebar />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.mainInner}>
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
