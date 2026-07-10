import type { Metadata } from "next";
import DashboardSidebar from "./_components/DashboardSidebar";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Dashboard — Resourcefull",
  description: "Manage your resources, pathways, and hubs.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className={styles.dashboardLayout}>
        <div className={styles.sidebarWrapper}>
          <DashboardSidebar />
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
