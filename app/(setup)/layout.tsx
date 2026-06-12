import type { Metadata } from "next";
import Image from "next/image";
import SetupTopNav from "./_components/SetupTopNav";
import styles from "./layout.module.css";
import Mockup from "@/public/assets/onboardingMockup2.png";

export const metadata: Metadata = {
  title: "Setup Profile - Resourcefull",
  description: "Set up your professional identity on Resourcefull.",
};

export default function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.setupLayout}>
      <aside className={styles.sidebarPanel}>
        <Image
          src={Mockup}
          alt="Resourcefull Setup Mockup"
          className={styles.heroImage}
          priority
        />
      </aside>
      <main className={styles.main}>
        <SetupTopNav />
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
