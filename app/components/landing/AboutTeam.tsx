import Image from "next/image";
import styles from "./AboutTeam.module.css";
import AdaezeImg from "@/public/assets/adaeze.png";

const teamMembers = [
  { name: "Adaeze Okafor", role: "Senior PM", image: AdaezeImg },
  { name: "Adaeze Okafor", role: "Senior PM", image: AdaezeImg },
  { name: "Adaeze Okafor", role: "Senior PM", image: AdaezeImg },
  { name: "Adaeze Okafor", role: "Senior PM", image: AdaezeImg },
  { name: "Adaeze Okafor", role: "Senior PM", image: AdaezeImg },
  { name: "Adaeze Okafor", role: "Senior PM", image: AdaezeImg },
  { name: "Adaeze Okafor", role: "Senior PM", image: AdaezeImg },
  { name: "Adaeze Okafor", role: "Senior PM", image: AdaezeImg },
];

export default function AboutTeam() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>MEET THE TEAM</span>
          <h2 className={styles.title}>
            The Dream Team Behind It All
          </h2>
          <p className={styles.description}>
            Create your personalized Hub — a single link that showcases all
            the resources you&apos;ve created, saved, and recommended.
          </p>
        </div>

        <div className={styles.grid}>
          {teamMembers.map((member, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={80}
                  height={80}
                  className={styles.avatar}
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
