"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput, Button } from "@/app/components/ui";
import { authAPI } from "@/app/lib/api/auth";
import styles from "./ResetPasswordForm.module.css";

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return "We couldn’t reset your password. The link may have expired.";
}

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || searchParams.get("resetToken") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  const validationMessage = !password ? "" : password.length < 8
    ? "Use at least 8 characters."
    : password !== confirmPassword
      ? "Passwords do not match."
      : "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setError("This reset link is missing or invalid. Please request a new one.");
      return;
    }
    if (password.length < 8 || password !== confirmPassword) return;

    setLoading(true);
    setError("");
    try {
      const response = await authAPI.resetPassword({ token, password });
      if (!response.success) {
        throw new Error(response.message || "Password reset failed");
      }
      setComplete(true);
    } catch (resetError) {
      setError(getErrorMessage(resetError));
    } finally {
      setLoading(false);
    }
  };

  if (complete) {
    return (
      <div className={styles.successPanel} role="status">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h2>Password updated</h2>
        <p>Your password has been changed successfully. You can now sign in with your new password.</p>
        <Button type="button" variant="primary" size="lg" fullWidth onClick={() => router.push("/login")}>
          Back to log in
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.formContent}>
      {error && <div className={styles.errorMessage} role="alert">{error}</div>}
      {!token && <div className={styles.errorMessage} role="alert">This reset link is missing or invalid. Request a new link to continue.</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <PasswordInput
          id="new-password"
          label="New password"
          placeholder="Enter your new password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
          error={password ? validationMessage : undefined}
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm new password"
          placeholder="Enter your new password again"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          required
          error={confirmPassword && password !== confirmPassword ? "Passwords do not match." : undefined}
        />
        <p className={styles.passwordHint}>Your password must be at least 8 characters.</p>
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={!token || password.length < 8 || password !== confirmPassword || loading}>
          {loading ? "Updating password..." : "Update password"}
        </Button>
      </form>
      <Link href="/login" className={styles.backLink}>Back to log in</Link>
    </div>
  );
}
