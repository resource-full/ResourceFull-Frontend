"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./PopularCategories.module.css";

const categories = [
  {
    title: "Brand Designing",
    image: "/assets/brand-designing.jpg",
  },
  {
    title: "Graphic Designing",
    image: "/assets/graphic-designing.jpg",
  },
  {
    title: "Medical Research",
    image: "/assets/medical-research.jpg",
  },
  {
    title: "SAT",
    image: "/assets/SAT.jpg",
  },
];

export default function PopularCategories() {
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Popular Categories</h2>
        <p className={styles.subtitle}>
          Use Resourcefull to{" "}
          <Link href="/build-career" className={styles.subtitleLink}>
            build your career
          </Link>
          ,{" "}
          <Link href="/get-into-school" className={styles.subtitleLink}>
            get into school
          </Link>{" "}
          or{" "}
          <Link href="/take-a-test" className={styles.subtitleLink}>
            take a test
          </Link>
        </p>
      </div>

      <div className={styles.grid}>
        {categories.map((cat, idx) => (
          <div key={idx} className={styles.card}>
            <Image
              src={cat.image}
              alt={cat.title}
              width={400}
              height={600}
              className={styles.cardImage}
            />
            <div className={styles.overlay}>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
