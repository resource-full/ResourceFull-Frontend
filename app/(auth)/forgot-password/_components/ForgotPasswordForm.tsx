"use client";

import { useState } from "react";
import Link from "next/link";
import { Input, Button } from "@/app/components/ui";
import { authAPI } from "@/app/lib/api/auth";
import styles from "./ForgotPasswordForm.module.css";

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return "We couldn’t start the password reset. Please try again.";
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.forgotPassword(email.trim());
      if (!response.success) {
        throw new Error(response.message || "Password reset request failed");
      }

      setSubmittedEmail(email.trim());
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  if (submittedEmail) {
    return (
      <div className={styles.successPanel} role="status">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h2>Check your inbox</h2>
        <p>
          If an account exists for <strong>{submittedEmail}</strong>, you&apos;ll receive a password reset link shortly.
        </p>
        <button type="button" className={styles.secondaryAction} onClick={() => setSubmittedEmail("")}>          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className={styles.formContent}>
      {error && <div className={styles.errorMessage} role="alert">{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="forgot-email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          required
        />
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={!email.trim() || loading}>
          {loading ? "Sending link..." : "Send reset link"}
        </Button>
      </form>
      <Link href="/login" className={styles.backLink}>Back to log in</Link>
    </div>
  );
}
