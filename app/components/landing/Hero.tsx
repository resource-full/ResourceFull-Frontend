"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function Hero() {
  const [goal, setGoal] = useState("Select your goal");
  const [category, setCategory] = useState("Select a category");

  return (
    <section className={styles.hero}>
      {/* Floating Icons (Mocked with SVGs) */}
      <div className={`${styles.floatingIcon} ${styles.icon1}`}>
        <div className="bg-blue-100 p-3 rounded-xl rotate-12 shadow-lg">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#024A94" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
      </div>
      <div className={`${styles.floatingIcon} ${styles.icon2}`}>
        <div className="bg-green-100 p-3 rounded-full -rotate-12 shadow-lg">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25c16f" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </div>
      </div>

      <h1 className={styles.headline}>
        Find The Perfect <span className={styles.accent}>Resources</span> To Help You
        Secure A <span className={styles.accent}>Job</span> And Achieve Your{" "}
        <span className={styles.accent}>Goals</span>
      </h1>
      <p className={styles.subheadline}>
        Easily access 500+ resources and pathways across more than 30 career
        categories
      </p>

      {/* Interactive Search Mock */}
      <div className={styles.searchContainer}>
        <div className={styles.searchGroup}>
          <span className={styles.searchLabel}>Your Goal</span>
          <div className={styles.searchSelector}>
            <span>{goal}</span>
            <ChevronDown />
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.searchGroup}>
          <span className={styles.searchLabel}>Category</span>
          <div className={styles.searchSelector}>
            <SearchIcon />
            <span>{category}</span>
            <ChevronDown />
          </div>
        </div>

        <button className={styles.findBtn}>Find Resources</button>
      </div>

      <div className={styles.popularSection}>
        <span className={styles.popularLabel}>Popular:</span>
        <span className={styles.tag}>Graphic Designing</span>
        <span className={styles.tag}>Brand Designing</span>
        <span className={styles.tag}>Medical School</span>
        <span className={styles.tag}>GMB</span>
      </div>
    </section>
  );
}
