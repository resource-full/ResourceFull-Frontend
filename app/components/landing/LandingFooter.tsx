"use client";

import Logo from "@/app/components/ui/Logo";
import styles from "./LandingFooter.module.css";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo iconSize={32} fontSize={20} />
        </div>
        <div className={styles.right}>
          <p className={styles.copyrightText}>
            © {currentYear} ResourceFull. Built for ambitious Africans.
          </p>
        </div>
      </div>
    </footer>
  );
}
