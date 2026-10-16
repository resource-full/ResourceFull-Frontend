"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, PasswordInput, Button } from "@/app/components/ui";
import Logo from "@/app/components/ui/Logo";
import styles from "./page.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // There is no admin API on the backend yet, so this cannot verify
    // admin credentials for real. Send the user into the regular app instead.
    router.push("/dashboard");
  };

  return (
    <div className={styles.section}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <Logo iconSize={40} fontSize={24} />
        </div>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>Sign in to access the admin panel</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            id="admin-email"
            label="Email"
            placeholder="admin@resourcefull.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />
          <PasswordInput
            id="admin-password"
            label="Password"
            placeholder="Placeholder"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={!isFormValid || loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className={styles.note}>
          Admin accounts aren&apos;t verified yet — logging in takes you to the regular dashboard.
        </p>
      </div>
    </div>
  );
}
