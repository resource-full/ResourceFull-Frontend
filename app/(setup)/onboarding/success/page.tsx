"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../setup.module.css";

export default function SuccessSetupPage() {
  return (
    <div className={styles.container} style={{ alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
      
      {/* Centered Step Indicator for Success Page */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "48px" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#024A94", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>
          1
        </div>
        <div style={{ width: "40px", height: "2px", background: "#024A94" }} />
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#024A94", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>
          2
        </div>
      </div>

      <div style={{
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "#E8F5E9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "24px",
        color: "#4CAF50"
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h1 className={styles.title} style={{ fontSize: "32px", marginBottom: "12px", color: "#11243d" }}>
        You&apos;re All Set!
      </h1>
      <p className={styles.subtitle} style={{ marginBottom: "48px" }}>
        Start exploring and save your first resource!
      </p>

      <Link href="/dashboard" style={{ width: "100%", maxWidth: "400px" }}>
        <button className={styles.submitBtn} style={{ width: "100%", marginTop: 0 }}>
          Go to Resourcefull
        </button>
      </Link>
    </div>
  );
}
