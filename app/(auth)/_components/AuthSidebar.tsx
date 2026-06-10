import Image from "next/image";
import styles from "./AuthSidebar.module.css";
import Mockup from '@/public/assets/onboardingMockup.png'

export default function AuthSidebar() {
  return (
    <aside className={styles.sidebarPanel}>
      <Image
        src={Mockup}
        alt="Relevant resources for your career growth"
        className={styles.heroImage}
        priority
      />
    </aside>
  );
}
