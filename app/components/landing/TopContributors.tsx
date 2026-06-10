import Image from "next/image";
import styles from "./TopContributors.module.css";
import Avatar from '@/public/assets/adaeze.png';

const mockContributors = [
  { id: 1, avatar: Avatar, name: "Adaeze Okafor", role: "Senior PM • Frontend Development", stats: [{ value: "84", label: "Resources Uploaded" }, { value: "96%", label: "Resources Uploaded" }] },
  { id: 2, avatar: Avatar, name: "Adaeze Okafor", role: "Senior PM • Frontend Development", stats: [{ value: "84", label: "Resources Uploaded" }, { value: "96%", label: "Resources Uploaded" }] },
  { id: 3, avatar: Avatar, name: "Adaeze Okafor", role: "Senior PM • Frontend Development", stats: [{ value: "84", label: "Resources Uploaded" }, { value: "96%", label: "Resources Uploaded" }] },
  { id: 4, avatar: Avatar, name: "Adaeze Okafor", role: "Senior PM • Frontend Development", stats: [{ value: "84", label: "Resources Uploaded" }, { value: "96%", label: "Resources Uploaded" }] },
];

export default function TopContributors() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>TOP CONTRIBUTORS</span>
          <h2 className={styles.title}>Learn from those who&apos;ve done it</h2>
        </div>

        <div className={styles.grid}>
          {mockContributors.map((contributor) => (
            <div key={contributor.id} className={styles.card}>
              <div className={styles.cardGradient}></div>

              <div className={styles.avatarContainer}>
                <Image src={contributor.avatar} alt={contributor.name} width={64} height={64} className={styles.avatar} />
              </div>

              <h3 className={styles.name}>{contributor.name}</h3>
              <p className={styles.role}>{contributor.role}</p>

              <div className={styles.divider}></div>

              <div className={styles.statsContainer}>
                {contributor.stats.map((stat, idx) => (
                  <div key={idx} className={styles.statBox}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
