import Image from "next/image";
import styles from "./AboutBackstory.module.css";
import BackstoryImg from "@/public/assets/brown.png";

export default function AboutBackstory() {
  return (
    <section id="about-backstory" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>OUR BACKSTORY</span>
          <h2 className={styles.title}>
            We understood that<br />people need resources...
          </h2>
          <p className={styles.description}>
            We understood that people need resources. But more than that, we realized that people are completely exhausted by the hunt for them.
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
