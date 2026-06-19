import Image from "next/image";
import styles from "./AboutBackstory.module.css";
import BackstoryImg from "@/public/assets/oyibo.jpg";

export default function AboutBackstory() {
  return (
    <section id="about-backstory" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>OUR BACKSTORY</span>
          <h2 className={styles.title}>
            We understood that people need resources...
          </h2>
          <p className={styles.description}>
            ResourceFull puts every career tool you need in one place — no
            more hunting across WhatsApp groups and Google Drives.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={BackstoryImg}
            alt="Person working on their career resources"
            width={380}
            height={528}
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
}
