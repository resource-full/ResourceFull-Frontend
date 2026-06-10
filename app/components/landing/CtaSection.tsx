import Link from "next/link";
import styles from "./CtaSection.module.css";
import Image from "next/image";
import CtaImg from "@/public/assets/fine-girl.jpg";

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>GET STARTED TODAY!</span>
          <h2 className={styles.title}>Your expertise<br />deserves a home.</h2>
          <p className={styles.subtitle}>
            Create your personalized Hub — a single link that showcases all<br />
            the resources you&apos;ve created, saved, and recommended.
          </p>
          <Link href="/add-resource" className={styles.button}>
            Create a resource
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imagePlaceholder}>
            <Image src={CtaImg} alt="CTA Image" width={524} height={400} className={styles.ctaImg} style={{ borderRadius: "20px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
