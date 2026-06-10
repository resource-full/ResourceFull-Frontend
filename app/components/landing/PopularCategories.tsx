"use client";

import styles from "./PopularCategories.module.css";

const DocumentIcon = () => (
  <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 2C2.22386 2 2 2.22386 2 2.5V25.5C2 25.7761 2.22386 26 2.5 26H19.5C19.7761 26 20 25.7761 20 25.5V13.5C20 11.567 18.433 10 16.5 10H14.5C13.1193 10 12 8.88071 12 7.5V5.5C12 3.567 10.433 2 8.5 2H2.5ZM2.5 0C1.11929 0 0 1.11929 0 2.5V25.5C0 26.8807 1.11929 28 2.5 28H19.5C20.8807 28 22 26.8807 22 25.5V13C22 5.8203 16.1797 0 9 0H2.5ZM13.3427 2.89047C13.762 3.66692 14 4.55567 14 5.5V7.5C14 7.77614 14.2239 8 14.5 8H16.5C17.4443 8 18.3331 8.238 19.1095 8.65728C17.9984 6.07399 15.926 4.00164 13.3427 2.89047ZM5 18C5 17.4477 5.44772 17 6 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H6C5.44772 19 5 18.5523 5 18ZM5 22C5 21.4477 5.44772 21 6 21H11C11.5523 21 12 21.4477 12 22C12 22.5523 11.5523 23 11 23H6C5.44772 23 5 22.5523 5 22Z" fill="currentColor" />
  </svg>
);

const categories = [
  { title: "CV & CoverLetters", count: "234000 resources", iconColor: "#0F172A", color: "#9DBCFF" },
  { title: "CV & CoverLetters", count: "234000 resources", iconColor: "#0F172A", color: "#F79DFF" },
  { title: "CV & CoverLetters", count: "234000 resources", iconColor: "#0F172A", color: "#CB9DFF" },
  { title: "CV & CoverLetters", count: "234000 resources", iconColor: "#0F172A", color: "#AEF295" },
  { title: "CV & CoverLetters", count: "234000 resources", iconColor: "#0F172A", color: "#F2E695" },
  { title: "CV & CoverLetters", count: "234000 resources", iconColor: "#0F172A", color: "#F29A95" },
  { title: "CV & CoverLetters", count: "234000 resources", iconColor: "#0F172A", color: "#9DBCFF" },
  { title: "CV & CoverLetters", count: "234000 resources", iconColor: "#0F172A", color: "#9DBCFF" },
];

export default function PopularCategories() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>CATEGORIES</span>
          <h2 className={styles.title}>Find <span className={styles.exac}>exactly</span> what<br />you need</h2>
          <p className={styles.subtitle}>
            Every resource is tagged by type, country, and role so you<br />always land on what&apos;s relevant.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, idx) => (
            <div key={idx} className={styles.card}>
              <div className="flex-1 justify-center items-center">
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: cat.color, color: cat.iconColor, borderRadius: "8px", padding: "8px" }}
                >
                  <DocumentIcon />
                </div>
              </div>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <p className={styles.cardCount}>{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
