import Image from "next/image";
import styles from "./AboutBackstory2.module.css";
import BackstoryImg from "@/public/assets/suit-man.png";

export default function AboutBackstory2() {
  return (
    <section id="about-backstory2" className={styles.section}>
      <div className={styles.container}>
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

        <div className={styles.content}>
          <span className={styles.badge}>OUR BACKSTORY</span>
          <h2 className={styles.title}>
            Then we built the <br /> antidote..
          </h2>

          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              ResourceFull puts every career tool you need in one place. No more hunting.
            </p>

            <p className={styles.description}>
              We created a two-sided marketplace where trust is a currency. It’s a space where anyone can build a personalized storefront under a custom link (rfull.store/username) to share curated pathways, while our system automatically preserves and protects the attribution of the original creator.
            </p>

            <p className={styles.description}>
              We are building the navigation system for modern ambition. By young professionals, for young professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
