import type { Metadata } from "next";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import styles from "../onboarding/page.module.css";

export const metadata: Metadata = {
  title: "Forgot Password — Resourcefull",
  description: "Reset your Resourcefull account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className={styles.formInner}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Forgot your password?</h1>
        <p className={styles.formSubtitle}>
          Enter the email connected to your account and we&apos;ll help you get back in.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
