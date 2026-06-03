"use client";

import styles from "./Stories.module.css";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Stories() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Stories</h2>
      
      <div className={styles.testimonialCard}>
        <div className={styles.cardHeader}>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>Michael Ojo</span>
          </div>
          <span className={styles.date}>Feb 2</span>
        </div>

        <p className={styles.content}>
          &quot;Resourcefull has been a thoughtful and experienced journey. I&apos;ve used resources to prepare for corporate interview processes. Each time I&apos;ve done so, it&apos;s been awesome! With the help of Resourcefull, Sarah&apos;s life began to change for the better. The app&apos;s timely notifications ensured she never missed important deadlines for applications and services. She enrolled in the coding bootcamp and, with the skills she gained, secured a better-paying job in tech support. The after-school programs kept her children engaged and learning, giving her peace of mind while she worked.&quot;
        </p>

        <div className={styles.badgeContainer}>
          <div className={styles.checkCircle}>
            <CheckIcon />
          </div>
          <span className={styles.badgeText}>Landed a role at Microsoft</span>
        </div>
      </div>
    </section>
  );
}
