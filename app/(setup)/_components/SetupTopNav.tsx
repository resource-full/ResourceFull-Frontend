"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../layout.module.css";

export default function SetupTopNav() {
  const pathname = usePathname();
  
  let currentStep = 1;
  if (pathname?.includes("/goals")) {
    currentStep = 2;
  } else if (pathname?.includes("/success")) {
    currentStep = 3;
  }

  // Hide TopNav entirely on success page
  if (currentStep === 3) return null;

  return (
    <div className={styles.topNav}>
      <div className={styles.stepIndicator}>
        {/* Step 1 Node */}
        <div className={`${styles.stepNode} ${currentStep >= 1 ? styles.stepNodeActive : ""}`}>
          {currentStep > 1 ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#024A94" }} />
          )}
        </div>
        
        {/* Line */}
        <div className={`${styles.stepLine} ${currentStep > 1 ? styles.stepLineActive : ""}`} />
        
        {/* Step 2 Node */}
        <div className={`${styles.stepNode} ${currentStep >= 2 ? styles.stepNodeActive : ""}`}>
           {currentStep > 2 ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : currentStep === 2 ? (
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#024A94" }} />
          ) : (
            ""
          )}
        </div>
      </div>

      <Link href="/dashboard" className={styles.skipLink}>
        Skip
      </Link>
    </div>
  );
}
