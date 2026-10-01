import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "./_components/ResetPasswordForm";
import styles from "../onboarding/page.module.css";

export const metadata: Metadata = {
  title: "Reset Password — Resourcefull",
  description: "Choose a new password for your Resourcefull account.",
};

export default function ResetPasswordPage() {
  return (
    <div className={styles.formInner}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Create a new password</h1>
        <p className={styles.formSubtitle}>
          Choose a strong password you haven&apos;t used before.
        </p>
      </div>
      <Suspense fallback={<div aria-live="polite">Loading password reset...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
