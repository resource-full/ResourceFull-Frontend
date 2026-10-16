"use client";

import styles from "./ContactHero.module.css";

const ArrowDownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#011A34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
    </svg>
);

export default function ContactHero() {
    const handleScroll = () => {
        const nextSection = document.getElementById("contact-form");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <span className={styles.badge}>CONTACT US</span>
                <h1 className={styles.title}>
                    Stuck? We can help!
                </h1>
                <p className={styles.subtitle}>
                    Reach out on email, Instagram, LinkedIn, or X and we&apos;ll reply as quickly as possible – usually within 24 hours.
                </p>
                <button className={styles.scrollArrow} onClick={handleScroll} aria-label="Scroll down">
                    <ArrowDownIcon />
                </button>
            </div>
        </section>
    );
}
