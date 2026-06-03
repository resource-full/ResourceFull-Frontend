import Image from "next/image";
import styles from "./AuthSidebar.module.css";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#024A94" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AuthSidebar() {
  return (
    <aside className={styles.sidebarPanel}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/assets/resourcefull-logo.png"
          alt="Resourcefull"
          width={272}
          height={68}
          className={styles.logoImage}
          priority
        />
      </div>

      {/* Features */}
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <div className={`${styles.featureHeader} bg-[#FFFFFF1A] rounded-[30px]`}>
            <span className={styles.checkIcon}>
              <CheckIcon />
            </span>
            <span className={styles.featureTitle}>Get Started Quickly</span>
          </div>
          <p className={styles.featureDesc}>
            Get access to resources you want as fast and easy as you can imagine
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className="bg-[#FFFFFF1A] rounded-[30px]">
            <div className={styles.featureHeader}>
              <span className={styles.checkIcon}>
                <CheckIcon />
              </span>
              <span className={styles.featureTitle}>Join millions of businesses</span>
            </div>
          </div>
          <p className={styles.featureDesc}>
            Resourcefull is trusted by ambitious startups and enterprises of every size.
          </p>
        </div>
      </div>

      {/* Hero image */}
      <div className={styles.heroSection}>
        <Image
          src="/assets/man-with-books.png"
          alt="Person holding books"
          width={1084}
          height={723}
          className={styles.heroImage}
          priority
        />
        <button type="button" className={styles.ctaButton}>
          Let&apos;s Get Started
          <span className={styles.ctaArrow}>
            <Image
              src="/assets/curved-arrow.png"
              alt="Arrow"
              width={25}
              height={17}
            />
          </span>
        </button>

        <div className={styles.heroFloat}>
          <Image src="/assets/Ellipse 522.png" width={130} height={130} alt="Round Circle" className={styles.heroFloat1} />
          <Image src="/assets/pin-host.png" width={40} height={40} alt="Pin Host" className={styles.heroFloat2} />
          <Image src="/assets/pdf.png" width={64.07} height={81.54} alt="PDF" className={styles.heroFloat3} />
        </div>
      </div>
    </aside>
  );
}
