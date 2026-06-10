"use client";

import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    color: "#F2F4DE", /* Yellowish */
    title: "Access",
    description: "ResourceFull puts every career tool you need in one place — no more hunting across WhatsApp groups and Google Drives.",
  },
  {
    number: "02",
    color: "#DEE9F4", /* Light Blue */
    title: "Grow",
    description: "ResourceFull puts every career tool you need in one place — no more hunting across WhatsApp groups and Google Drives.",
  },
  {
    number: "03",
    color: "#F4DEE5", /* Pink */
    title: "Share",
    description: "ResourceFull puts every career tool you need in one place — no more hunting across WhatsApp groups and Google Drives.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>HOW IT WORKS</span>
          <h2 className={styles.title}>Built for you to<br />actually grow</h2>
          <p className={styles.subtitle}>
            ResourceFull puts every career tool you need in one place — no<br />more hunting across WhatsApp groups and Google Drives.
          </p>
        </div>
        <div className={styles.grid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.number} style={{ color: step.color }}>
                {step.number}
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
