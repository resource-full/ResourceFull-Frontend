"use client";

import styles from "./HowItWorks.module.css";

const steps = [
  {
    title: "Find Your Category",
    description: "Browse through 40+ career categories",
  },
  {
    title: "Reach your goal",
    description: "Work with your resources to achieve your goal within your timeline",
  },
  {
    title: "Get Custom-Tailored Resources",
    description: "Your resources will guide you through a better understanding of your career",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>How It Works</h2>
      <div className={styles.grid}>
        {steps.map((step, idx) => (
          <div key={idx} className={styles.card}>
            <h3 className={styles.cardHeader}>{step.title}</h3>
            <p className={styles.cardDesc}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
