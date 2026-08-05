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

          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              We understood that people need resources. But more than that, we realized that people are completely exhausted by the hunt for them.
            </p>

            <p className={styles.description}>
              Take <strong>Abisola</strong>, for example. When she decided to transition away from Investment Research to find a new path, she spent over <strong>60 hours</strong> doing digital detective work. She was exhausted by the hunt.
            </p>

            <p className={styles.description}>
              Abisola’s story isn’t unique. Right now, ambitious, brilliant young professionals across emerging economies are spending up to <strong>40% of their career advancement time just trying to find the map,</strong> instead of actually walking the path.
            </p>

            <p className={styles.description}>
              That felt wrong to us. So we built the antidote.....
            </p>
          </div>
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
