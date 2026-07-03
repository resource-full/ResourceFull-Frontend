"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";
import Avatar from "@/public/assets/Mask group.png";
import Pdf from "@/public/assets/fullPdf.png";

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const DocIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const mockCards = [
  { id: 1, bgColor: "#AD3307" }, // Orange/Rust
  { id: 2, bgColor: "#58169C" }, // Purple
  { id: 3, bgColor: "#9C1658" }, // Pink/Magenta
  { id: 4, bgColor: "#52B114" }, // Green
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <h1 className={styles.headline}>
            Stop <span className={styles.textDark}>Searching</span><br />
            Get the Right <span className={styles.textBlue}>Resource</span>
          </h1>
          <p className={styles.subheadline}>
            Your one-stop career resource platform — curated CVs, fellowship
            guides, skill pathways, and more. All in one place, confidence-scored,
            and ready for you.
          </p>

          <div className={styles.actions}>
            <Link href="/login">
              <button className={styles.loginBtn}>Log In</button>
            </Link>
            <Link href="/dashboard">
              <button className={styles.getResourcesBtn}>
                Get Resources
                <ArrowRight />
              </button>
            </Link>
          </div>

          <div className={styles.statsDivider} />

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>12K+</h3>
              <p className={styles.statLabel}>Resources Uploaded</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>3,400</h3>
              <p className={styles.statLabel}>Contributors</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>50+</h3>
              <p className={styles.statLabel}>Countries Covered</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>~84%</h3>
              <p className={styles.statLabel}>AVG. Confidence Score</p>
            </div>
          </div>
        </div>

        {/* Right Column: Preview Widget */}
        <div className={styles.rightColumn}>
          <div className={styles.previewWidget}>
            <div className="bg-white rounded-[20px]" style={{ padding: "20px", marginBottom: "24px" }}>
              <h3 className={styles.widgetTitle}>Find a Resource</h3>

              <div className="relative">
                <input className={styles.mockSearchInput} style={{ paddingLeft: "36px" }} placeholder="e.g. Google fellowship guide, Nigeria tech CV..." />
                <div className="absolute top-3 left-3">
                  <SearchIcon />
                </div>
              </div>
            </div>

            <div className={styles.mockCardsGrid}>
              {mockCards.map((card) => (
                <div key={card.id} className={styles.miniCard} style={{ backgroundColor: card.bgColor }}>
                  <div className={styles.imageDiv}>
                    <Image src={Pdf} alt="pdf" />
                  </div>

                  <div className={styles.cardContent}>
                    <h4 className={styles.miniCardTitle}>
                      Graphic Designer<br />80% wining rate CV
                    </h4>

                    <div className={styles.miniDocType}>
                      <DocIcon />
                      <span>.pdf</span>
                    </div>

                    <div className={styles.miniTags} style={{ color: card.bgColor }}>
                      <span className={styles.miniTag}>Design</span>
                      <span className={styles.miniTag}>CV</span>
                    </div>

                    <div className={styles.miniFooter}>
                      <Image src={Avatar} alt="Stella Delta" width={16} height={16} className={styles.microAvatar} />
                      <span className={styles.microAuthor}>Stella Delta</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.widgetFooter}>
              <span>Seeing 4 of 12,000+ resources. </span>
              <Link href="/login" className={styles.loginLink}>Log In for full access</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
