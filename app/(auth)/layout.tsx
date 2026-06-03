import type { Metadata } from "next";
import AuthSidebar from "./_components/AuthSidebar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Join Resourcefull",
  description:
    "Create your Resourcefull account and get access to resources as fast and easy as you can imagine.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.authLayout}>
      <AuthSidebar />
      <div className={styles.main}>{children}</div>
    </div>
  );
}
