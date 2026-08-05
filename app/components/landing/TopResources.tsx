import Link from "next/link";
import styles from "./TopResources.module.css";
import Avatar from "@/public/assets/Mask group.png";
import Image from "next/image";
import CvPreview from "@/public/assets/plain-pdf.png";

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

const ArrowUpRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.625 3.125L18.875 3.125C19.0739 3.125 19.2647 3.20402 19.4053 3.34467C19.546 3.48532 19.625 3.67609 19.625 3.875V15.125C19.625 15.5392 19.2892 15.875 18.875 15.875C18.4608 15.875 18.125 15.5392 18.125 15.125V5.68566L4.40533 19.4053C4.11244 19.6982 3.63756 19.6982 3.34467 19.4053C3.05178 19.1124 3.05178 18.6376 3.34467 18.3447L17.0643 4.625L7.625 4.625C7.21079 4.625 6.875 4.28921 6.875 3.875C6.875 3.46079 7.21079 3.125 7.625 3.125Z" fill="#02386F" />
  </svg>
);

const mockResources = [
  {
    id: 1,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Graphic Designer 80% wining rate CV",
    cardColor: "#58169C",
    price: "$120",
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a stando...",
    tags: ["Design", "CV"],
    usersCount: "2.5k",
    csScore: "70% C.S"
  },
  {
    id: 2,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Graphic Designer 80% wining rate CV",
    cardColor: "#63C132",
    price: "$120",
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a stando...",
    tags: ["Design", "CV"],
    usersCount: "2.5k",
    csScore: "70% C.S"
  },
  {
    id: 3,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Graphic Designer 80% wining rate CV",
    cardColor: "#C84C32",
    price: "$120",
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a stando...",
    tags: ["Design", "CV"],
    usersCount: "2.5k",
    csScore: "70% C.S"
  },
  {
    id: 4,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Graphic Designer 80% wining rate CV",
    cardColor: "#C19A29",
    price: "$120",
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a stando...",
    tags: ["Design", "CV"],
    usersCount: "2.5k",
    csScore: "70% C.S"
  },
  {
    id: 5,
    avatar: Avatar,
    author: "Stella Delta",
    title: "Graphic Designer 80% wining rate CV",
    cardColor: "#9C3857",
    price: "$120",
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a stando...",
    tags: ["Design", "CV"],
    usersCount: "2.5k",
    csScore: "70% C.S"
  }
];

export default function TopResources() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>TOP RESOURCES</span>
            <h2 className={styles.title}>Tried, tested, and uploaded<br />by people like you</h2>
            <p className={styles.subTitle}>Every resource is real . From actual CVs that landed roles and<br />guides written by past recipients.</p>
          </div>
          <Link href="/dashboard" className={styles.viewAllBtn}>
            View all Resources
            <ArrowUpRight />
          </Link>
        </div>

        <div className={styles.grid}>
          {mockResources.map((resource) => (
            <div key={resource.id} className={styles.card} style={{ backgroundColor: resource.cardColor }}>
              <div className={styles.cardHeader}>
                <div className={styles.authorInfo}>
                  <Image src={resource.avatar} alt="avatar" width={20} height={20} style={{ borderRadius: '50%' }} />
                  <span className={styles.authorName}>{resource.author}</span>
                </div>
                <button className={styles.bookmarkBtn} aria-label="Bookmark">
                  <BookmarkIcon />
                </button>
              </div>

              <h3 className={styles.cardTitle}>{resource.title}</h3>
              <div className={styles.price}>
                {resource.price}
              </div>

              <p className={styles.description}>{resource.description}</p>

              <div className={styles.resourcesMeta}>
                <DocumentIcon />
                <span style={{ marginLeft: '4px' }}>.pdf</span>
              </div>

              <div className={styles.tags}>
                {resource.tags.map((tag, index) => (
                  <span key={index} className={styles.tag} style={{ color: resource.cardColor }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.previewImageContainer}>
                <Image src={CvPreview} alt="CV Preview" fill style={{ objectFit: 'cover' }} />
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.usersInfo}>
                  <div className={styles.userAvatars}>
                    <Image src={resource.avatar} alt="user" width={20} height={20} className={styles.smallAvatar} style={{ zIndex: 2 }} />
                    <Image src={resource.avatar} alt="user" width={20} height={20} className={styles.smallAvatar} style={{ zIndex: 1, marginLeft: '-10px' }} />
                  </div>
                  <span className={styles.usersCount}>{resource.usersCount}</span>
                </div>
                <div className={styles.csBadge}>
                  {resource.csScore}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
