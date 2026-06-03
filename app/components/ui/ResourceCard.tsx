"use client";

import Image from "next/image";
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
  commentCount: number;
}

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
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
}: ResourceCardProps) {
  const variantClass = variant === "purple" ? styles.variantPurple : styles.variantOrange;

  return (
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
        <button className={styles.bookmarkBtn} aria-label="Bookmark">
          <BookmarkIcon />
        </button>
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
          <MessageIcon />
        </div>
      </div>
    </div>
  );
}
