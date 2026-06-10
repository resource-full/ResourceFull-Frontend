"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./LandingNavbar.module.css";

export default function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

      <div className={`${styles.navLinks} ${styles.desktopOnly}`}>
        <Link href="#how-it-works" className={styles.navLink}>
          How it works
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/contact" className={styles.navLink}>
          Contact Us
        </Link>
      </div>

      <div className={`${styles.actions} ${styles.desktopOnly}`}>
        <Link href="/login">
          <button className={styles.loginBtn}>Log In</button>
        </Link>
        <Link href="/login">
          <button className={styles.getStartedBtn}>
            Get Resources
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Hamburger Menu Icon */}
      <button 
        className={styles.hamburgerBtn} 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileNavLinks}>
            <Link href="#how-it-works" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
              How it works
            </Link>
            <Link href="/about" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
              About
            </Link>
            <Link href="/contact" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
              Contact Us
            </Link>
          </div>
          
          <div className={styles.mobileActions}>
            <Link href="/login" onClick={toggleMobileMenu} className={styles.mobileActionLink}>
              <button className={`${styles.loginBtn} ${styles.fullWidth}`}>Log In</button>
            </Link>
            <Link href="/login" onClick={toggleMobileMenu} className={styles.mobileActionLink}>
              <button className={`${styles.getStartedBtn} ${styles.fullWidth}`}>
                Get Resources
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
