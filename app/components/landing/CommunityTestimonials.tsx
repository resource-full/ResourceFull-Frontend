import React from "react";
import styles from "./CommunityTestimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 2,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 3,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 4,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 5,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 6,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 7,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 8,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 9,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
  {
    id: 10,
    name: "Kwame D.",
    quote: '"The ALX application guide saved me weeks. Someone had already mapped every essay question. I got in on my first try."',
  },
];

export default function CommunityTestimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.badge}>FROM THE COMMUNITY</span>
        <h2 className={styles.title}>Real people. Real results, not promises.</h2>

        <div className={styles.carousel}>
          {testimonials.map((t) => (
            <div key={t.id} className={styles.card}>
              <h3 className={styles.cardName}>{t.name}</h3>
              <p className={styles.cardQuote}>{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
