"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./LandingNavbar.module.css";

export default function LandingNavbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoContainer}>
        <Image
          src="/assets/resourcefull-logo-2.png"
          alt="Resourcefull Logo"
          width={180}
          height={45}
          className={styles.logo}
          priority
        />
      </Link>

      <div className={styles.navLinks}>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/explore" className={styles.navLink}>
          Explore
        </Link>
        <Link href="/faqs" className={styles.navLink}>
          FAQs
        </Link>
      </div>

      <div className={styles.actions}>
        <Link href="/login">
          <button className={styles.loginBtn}>Log In</button>
        </Link>
        <Link href="/onboarding">
          <button className={styles.getStartedBtn}>Get Started</button>
        </Link>
      </div>
    </nav>
  );
}
