"use client";

import styles from "./AboutHero.module.css";

const ArrowDownIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="16" fill="#F7F7F7" />
    <path fillRule="evenodd" clipRule="evenodd" d="M28 18.25C28.4142 18.25 28.75 18.5858 28.75 19L28.75 35.1893L34.9697 28.9697C35.2626 28.6768 35.7374 28.6768 36.0303 28.9697C36.3232 29.2626 36.3232 29.7374 36.0303 30.0303L28.5303 37.5303C28.2374 37.8232 27.7626 37.8232 27.4697 37.5303L19.9697 30.0303C19.6768 29.7374 19.6768 29.2626 19.9697 28.9697C20.2626 28.6768 20.7374 28.6768 21.0303 28.9697L27.25 35.1893L27.25 19C27.25 18.5858 27.5858 18.25 28 18.25Z" fill="#0F172A" />
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
          Create your personalized Hub — a single link that showcases all
          the resources you&apos;ve created, saved, and recommended.
        </p>
        <button className={styles.scrollArrow} onClick={handleScroll} aria-label="Scroll down">
          <ArrowDownIcon />
        </button>
      </div>
    </section>
  );
}
