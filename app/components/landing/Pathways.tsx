import Link from "next/link";
import styles from "./Pathways.module.css";
import Avatar from "@/public/assets/Mask group.png"
import Image from "next/image";

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ArrowUpRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.625 3.125L18.875 3.125C19.0739 3.125 19.2647 3.20402 19.4053 3.34467C19.546 3.48532 19.625 3.67609 19.625 3.875V15.125C19.625 15.5392 19.2892 15.875 18.875 15.875C18.4608 15.875 18.125 15.5392 18.125 15.125V5.68566L4.40533 19.4053C4.11244 19.6982 3.63756 19.6982 3.34467 19.4053C3.05178 19.1124 3.05178 18.6376 3.34467 18.3447L17.0643 4.625L7.625 4.625C7.21079 4.625 6.875 4.28921 6.875 3.875C6.875 3.46079 7.21079 3.125 7.625 3.125Z" fill="#02386F" />
  </svg>
);

const mockPathways = [
  {
    id: 1,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Become a Full Stack Developer in 3 Months",
    titleColor: "#58169C",
    price: "$120",
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume. Perfect for both beginners a...",
    tags: ["Design", "CV"],
    resourcesCount: 20,
    steps: ["Intro", "Tools", "Projects", "Set Up VS Code", "CV Template"],
    usersCount: "2.5k",
    commentsCount: 2
  },
  {
    id: 2,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Become a Full Stack Developer in 3 Months",
    titleColor: "#AD3307",
    price: "Free",
    isFree: true,
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume. Perfect for both beginners a...",
    tags: ["Design", "CV"],
    resourcesCount: 20,
    steps: ["Intro", "Tools", "Projects", "Set Up VS Code", "CV Template"],
    usersCount: "2.5k",
    commentsCount: 2
  },
  {
    id: 3,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Become a Full Stack Developer in 3 Months",
    titleColor: "#58169C",
    price: "$120",
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume. Perfect for both beginners a...",
    tags: ["Design", "CV"],
    resourcesCount: 20,
    steps: ["Intro", "Tools", "Projects", "Set Up VS Code", "CV Template"],
    usersCount: "2.5k",
    commentsCount: 2
  },
  {
    id: 4,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Become a Full Stack Developer in 3 Months",
    titleColor: "#AD3307",
    price: "Free",
    isFree: true,
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume. Perfect for both beginners a...",
    tags: ["Design", "CV"],
    resourcesCount: 20,
    steps: ["Intro", "Tools", "Projects", "Set Up VS Code", "CV Template"],
    usersCount: "2.5k",
    commentsCount: 2
  }
];

export default function Pathways() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>CURATED PATHWAYS</span>
            <h2 className={styles.title}>Your step-by-step<br />journey to the goal</h2>
            <p className={styles.subTitle}>Built by people who walked it. Resources in the right order, with<br />checkpoints at every stage.</p>
          </div>
          <Link href="/dashboard" className={styles.viewAllBtn}>
            View all pathways
            <ArrowUpRight />
          </Link>
        </div>

        <div className={styles.grid}>
          {mockPathways.map((pathway) => (
            <div key={pathway.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.authorInfo}>
                  <Image src={pathway.avatar} alt="avatar" width={20} height={20} />
                  <span className={styles.authorName}>{pathway.author}</span>
                </div>
                <button className={styles.bookmarkBtn} aria-label="Bookmark">
                  <BookmarkIcon />
                </button>
              </div>

              <h3 className={`${styles.cardTitle}`} style={{ color: pathway.titleColor }}>{pathway.title}</h3>
              <div className={`${styles.price} ${pathway.isFree ? styles.freePrice : ''}`}>
                {pathway.price}
              </div>

              <p className={styles.description}>{pathway.description}</p>

              <div className={styles.tags} style={{ backgroundColor: pathway.titleColor }}>
                {pathway.tags.map((tag, index) => (
                  <span key={index} className={`${styles.tag}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.resourcesMeta}>
                <DocumentIcon />
                <span>{pathway.resourcesCount} Resources</span>
              </div>

              <div className={styles.pathwayDiagram}>
                {pathway.steps.map((step, index) => (
                  <div key={index} className={styles.diagramStep}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <span className={styles.stepName}>{step}</span>
                  </div>
                ))}
                {/* SVG for the dashed connecting line */}
                <svg className={styles.diagramLine} width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                  <path d="M 40,25 C 100,25 200,25 250,25 C 270,25 270,60 250,60 C 200,60 100,60 40,60" fill="none" stroke="#D1C4E9" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.usersInfo}>
                  <div className={styles.userAvatars}>
                    <div className={styles.smallAvatar} style={{ zIndex: 2 }}>SD</div>
                    <div className={styles.smallAvatar} style={{ zIndex: 1, marginLeft: '-10px' }}>JD</div>
                  </div>
                  <span className={styles.usersCount}>{pathway.usersCount}</span>
                </div>
                <div className={styles.commentsInfo}>
                  <span className={styles.commentsCount}>{pathway.commentsCount}</span>
                  <MessageIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
