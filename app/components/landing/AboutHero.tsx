"use client";

import styles from "./AboutHero.module.css";

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#011A34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

export default function AboutHero() {
  const handleScroll = () => {
    const nextSection = document.getElementById("about-backstory");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.badge}>ABOUT US</span>
        <h1 className={styles.title}>
          We found the way, now we&apos;re showing you!
        </h1>
        <p className={styles.subtitle}>
          Create your personalized Hub a single link that showcases all
          the resources you&apos;ve created, saved, and recommended.
        </p>
        <button className={styles.scrollArrow} onClick={handleScroll} aria-label="Scroll down">
          <ArrowDownIcon />
        </button>
      </div>
    </section>
  );
}
