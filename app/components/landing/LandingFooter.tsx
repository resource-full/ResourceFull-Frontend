"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./LandingFooter.module.css";

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.98 0 1.775-.773 1.775-1.729V1.729c0-.955-.795-1.729-1.775-1.729z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.132 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.35 1.077 2.13 1.38c.76.297 1.63.498 2.903.558 1.28.06 1.687.072 4.947.072s3.667-.012 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.077-1.35 1.384-2.126c.296-.76.496-1.63.558-2.903.06-1.28.072-1.687.072-4.947s-.012-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.35-1.077-2.126-1.384c-.76-.297-1.63-.496-2.903-.558C15.667.012 15.259 0 12 0z" />
    <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
    <path d="M18.406 4.155a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
  </svg>
);

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandCol}>
          <Image
            src="/assets/resourcefull-logo-3.png"
            alt="Resourcefull Logo"
            width={180}
            height={45}
            className={styles.logo}
          />
          <div className={styles.socials}>
            <Link href="#" className={styles.socialIcon} aria-label="Instagram">
              <InstagramIcon />
            </Link>
            <Link href="#" className={styles.socialIcon} aria-label="Twitter">
              <TwitterIcon />
            </Link>
            <Link href="#" className={styles.socialIcon} aria-label="LinkedIn">
              <LinkedinIcon />
            </Link>
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Welcome</h3>
          <ul className={styles.linkList}>
            <li>
              <Link href="/onboarding" className={styles.link}>
                Get started
              </Link>
            </li>
            <li>
              <Link href="/login" className={styles.link}>
                Log in
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnHeading}>ResourceFull</h3>
          <ul className={styles.linkList}>
            <li>
              <Link href="/resources" className={styles.link}>
                Resources
              </Link>
            </li>
            <li>
              <Link href="/pathways" className={styles.link}>
                Pathways
              </Link>
            </li>
            <li>
              <Link href="/hubs" className={styles.link}>
                Hubs
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Company</h3>
          <ul className={styles.linkList}>
            <li>
              <Link href="/tos" className={styles.link}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={styles.link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/support" className={styles.link}>
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.copyrightSection}>
        <p className={styles.copyrightText}>
          © Resourcefull {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
