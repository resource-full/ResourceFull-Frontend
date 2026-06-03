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
        <h1 className={styles.formTitle}>Log in to your Account</h1>
        <p className={styles.formSubtitle}>
          Welcome back!, Log in to your account with
        </p>
      </div>

      {/* Login Form */}
      <LoginForm />

      {/* Footer */}
      <div className={styles.formFooter}>
        <div className={styles.footerLeft}>
          <span className={styles.footerDot} />
          <a href="/privacy" className={styles.footerLink}>
            Privacy &amp; Terms
          </a>
        </div>
      </div>
    </div>
  );
}
