"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, PasswordInput, Button, Checkbox } from "@/app/components/ui";
import styles from "./LoginForm.module.css";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.35-.35-2.1s.13-1.44.35-2.1V7.06H2.18c-.77 1.56-1.21 3.31-1.21 5.15s.44 3.59 1.21 5.15l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04.547-4.493 3.004-5.324-1.415-2.065-3.57-2.3-4.324-2.338-.754-.038-2.507 1.04-3.104 1.04zM15.352 2.231c.844-1.012 1.403-2.427 1.247-3.83-.883.037-1.95.592-2.584 1.336-.567.662-1.063 2.106-.93 3.478 1.014.078 2.041-.531 2.267-1.336z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
);

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }, 1500);
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "" && agreeTerms;

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <Input
          id="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={styles.authOptions}>
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={setRememberMe}
            mutedLabel
          />
          <Link href="/forgot-password" className={styles.forgotPassword}>
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!isFormValid || loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </form>

      <div className={styles.dividerContainer}>
        <div className={styles.line} />
        <span className={styles.dividerText}>or log in with</span>
        <div className={styles.line} />
      </div>

      <div className={styles.socialContainer}>
        <button className={styles.socialButton} aria-label="Login with Google">
          <GoogleIcon />
        </button>
        <button className={styles.socialButton} aria-label="Login with Apple">
          <AppleIcon />
        </button>
        <button className={styles.socialButton} aria-label="Login with Facebook">
          <FacebookIcon />
        </button>
      </div>

      <div className={styles.footerLinks}>
        <p className={styles.signupText}>
          Don&apos;t have an account?{" "}
          <Link href="/onboarding" className={styles.signupLink}>
            Sign Up
          </Link>
        </p>

        <div className={styles.termsContainer}>
          <Checkbox
            label="I agree to the Terms & Conditions"
            checked={agreeTerms}
            onChange={setAgreeTerms}
            mutedLabel
          />
        </div>
      </div>

      {showToast && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "#10b981",
          color: "#ffffff",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontWeight: 600,
          zIndex: 9999,
          animation: "slideInRight 0.3s ease forwards"
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Login successful! Redirecting...
        </div>
      )}
    </div>
  );
}
