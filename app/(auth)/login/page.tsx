import type { Metadata } from "next";
import LoginForm from "./_components/LoginForm";
import styles from "../onboarding/page.module.css";

export const metadata: Metadata = {
  title: "Login — Resourcefull",
  description: "Log in to your Resourcefull account to access your resources.",
};

export default function LoginPage() {
  return (
    <div className={styles.formInner}>
      {/* Header */}
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Log In</h1>
        <p className={styles.formSubtitle}>
          Welcome back!
        </p>
      </div>

      {/* Login Form */}
      <LoginForm />
    </div>
  );
}
