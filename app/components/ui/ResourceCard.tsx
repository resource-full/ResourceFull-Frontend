"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ResourceCard.module.css";

export type ResourceCardVariant = "purple" | "orange";

interface ResourceCardProps {
  variant: ResourceCardVariant;
  authorName: string;
  authorAvatarUrl: string;
  title: string;
  price: string;
  description: string;
  fileType: string;
  tags: string[];
  previewImageUrl?: string;
  viewCount: string;
  commentCount: number | string;
  href?: string;
  isPurchased?: boolean;
  isSaved?: boolean;
}

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const BookmarkedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2C11.7163 2 13.4088 2.1056 15.0703 2.31055C16.1944 2.44939 17 3.41385 17 4.5166V17.25C17 17.5078 16.8676 17.7475 16.6494 17.8848C16.4313 18.022 16.1582 18.0373 15.9258 17.9258L10 15.082L4.07422 17.9258C3.84185 18.0373 3.56873 18.022 3.35059 17.8848C3.1324 17.7475 3 17.5078 3 17.25V4.5166C3 3.41385 3.80562 2.44939 4.92969 2.31055C6.59124 2.1056 8.28365 2 10 2Z" fill="#EDFD02" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function ResourceCard({
  variant,
  authorName,
  authorAvatarUrl,
  title,
  price,
  description,
  fileType,
  tags,
  previewImageUrl,
  viewCount,
  commentCount,
  href,
  isPurchased,
  isSaved,
}: ResourceCardProps) {
  const variantClass = variant === "purple" ? styles.variantPurple : styles.variantOrange;

  const cardContent = (
    <div className={`${styles.card} ${variantClass}`}>
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <Image
            src={authorAvatarUrl}
            alt={authorName}
            width={32}
            height={32}
            className={styles.authorAvatar}
            unoptimized // Allow placeholder external images
          />
          <span className={styles.authorName}>{authorName}</span>
        </div>
        {isPurchased ? (
          <div className={styles.openBadge}>Open</div>
        ) : isSaved ? (
          <button className={styles.bookmarkBtn} aria-label="Bookmark">
            <BookmarkedIcon />
          </button>
        ) : (
          <button className={styles.bookmarkBtn} aria-label="Bookmark">
            <BookmarkIcon />
          </button>
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <div className={styles.price}>{price}</div>
      <p className={styles.description}>{description}</p>

      <div className={styles.metaContainer}>
        <div className={styles.fileType}>
          <DocumentIcon />
          {fileType}
        </div>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.previewContainer}>
        {/* Placeholder for CV Preview */}
        {previewImageUrl ? (
          <Image
            src={previewImageUrl}
            alt="Resource Preview"
            layout="fill"
            className={styles.previewImage}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded-md">
            Preview Unavailable
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.statsLeft}>
          <div className={styles.avatarStack}>
            {/* Mocking a stack of avatars */}
            <Image src="https://i.pravatar.cc/150?u=1" alt="User 1" width={28} height={28} unoptimized />
            <Image src="https://i.pravatar.cc/150?u=2" alt="User 2" width={28} height={28} unoptimized />
          </div>
          <span className={styles.viewCount}>{viewCount}</span>
        </div>
        <div className={styles.statsRight}>
          <span className={styles.commentCount}>{commentCount}</span>
          {isPurchased ? (
            <div className={styles.rsBadge}>R.S</div>
          ) : isSaved ? (
            <div className={styles.rsBadge}>R.S</div>
          ) : (
            <MessageIcon />
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={styles.cardLink} style={{ textDecoration: 'none', color: 'inherit' }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
