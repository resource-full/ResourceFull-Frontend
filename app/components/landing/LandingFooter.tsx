"use client";

import Image from "next/image";
import styles from "./LandingFooter.module.css";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image
            src="/assets/resourcefull-logo-2.png" /* Assuming the blue horizontal logo */
            alt="ResourceFull"
            width={160}
            height={40}
            className={styles.logo}
          />
        </div>
        <div className={styles.right}>
          <p className={styles.copyrightText}>
            © {currentYear} ResourceFull. Built for ambitious Africa.
          </p>
        </div>
      </div>
    </footer>
  );
}
