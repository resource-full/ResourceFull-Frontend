"use client";

import React from "react";
import Image from "next/image";
import styles from "./PathwayCard.module.css";

export type PathwayCardVariant = "purple" | "orange";

interface PathwayCardProps {
  id: number;
  variant: PathwayCardVariant;
  authorName: string;
  authorAvatarUrl: string;
  title: string;
  price: string;
  description: string;
  tags: string[];
  resourceCount: number;
  viewCount: string;
  commentCount: number;
}

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.33203 4C1.33203 2.89543 2.22746 2 3.33203 2H12.6654C13.7699 2 14.6654 2.89543 14.6654 4V9.33333C14.6654 10.4379 13.7699 11.3333 12.6654 11.3333H10.9415L8.4701 13.8047C8.20975 14.0651 7.78764 14.0651 7.52729 13.8047L5.05589 11.3333H3.33203C2.22746 11.3333 1.33203 10.4379 1.33203 9.33333V4ZM3.33203 3.33333C2.96384 3.33333 2.66536 3.63181 2.66536 4V9.33333C2.66536 9.70152 2.96384 10 3.33203 10H5.33203C5.50884 10 5.67841 10.0702 5.80344 10.1953L7.9987 12.3905L10.194 10.1953C10.319 10.0702 10.4886 10 10.6654 10H12.6654C13.0336 10 13.332 9.70152 13.332 9.33333V4C13.332 3.63181 13.0336 3.33333 12.6654 3.33333H3.33203ZM3.9987 5.33333C3.9987 4.96514 4.29717 4.66667 4.66536 4.66667H11.332C11.7002 4.66667 11.9987 4.96514 11.9987 5.33333C11.9987 5.70152 11.7002 6 11.332 6H4.66536C4.29717 6 3.9987 5.70152 3.9987 5.33333ZM3.9987 8C3.9987 7.63181 4.29717 7.33333 4.66536 7.33333H7.33203C7.70022 7.33333 7.9987 7.63181 7.9987 8C7.9987 8.36819 7.70022 8.66667 7.33203 8.66667H4.66536C4.29717 8.66667 3.9987 8.36819 3.9987 8Z" fill="#2C2C2C" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export default function PathwayCard({
  variant,
  authorName,
  authorAvatarUrl,
  title,
  price,
  description,
  tags,
  resourceCount,
  viewCount,
  commentCount,
}: PathwayCardProps) {
  const mainColor = variant === "purple" ? "#6a359c" : "#c4452a";
  const bgLightColor = variant === "purple" ? "rgba(106, 53, 156, 0.08)" : "rgba(196, 69, 42, 0.08)";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <img src={authorAvatarUrl} alt={authorName} className={styles.authorAvatar} />
          <span className={styles.authorName}>{authorName}</span>
        </div>
        <button className={styles.bookmarkBtn} aria-label="Bookmark pathway">
          <BookmarkIcon />
        </button>
      </div>

      <h3 className={styles.title} style={{ color: mainColor }}>{title}</h3>
      <div className={styles.price} style={{ color: mainColor }}>{price}</div>
      <p className={styles.description}>{description}</p>

      <div className={styles.tagsContainer}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag} style={{ backgroundColor: mainColor }}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.resourceCount}>
        <DocumentIcon />
        <span>{resourceCount} Resources</span>
      </div>

      <div className={styles.sequenceBlock} style={{ backgroundColor: bgLightColor }}>
        <div className={styles.sequenceRow}>
          <div className={styles.sequenceItem} style={{ backgroundColor: mainColor }}>
            <div className={styles.sequenceNumber} style={{ color: mainColor }}>1</div>
            Intro
          </div>
          <div className={styles.sequenceDash} style={{ borderTop: `2px dashed ${mainColor}` }}></div>
          <div className={styles.sequenceItem} style={{ backgroundColor: mainColor }}>
            <div className={styles.sequenceNumber} style={{ color: mainColor }}>2</div>
            Tools
          </div>
          <div className={styles.sequenceDash} style={{ borderTop: `2px dashed ${mainColor}` }}></div>
        </div>

        <div className={styles.sequenceRow}>
          <div className={styles.sequenceItem} style={{ backgroundColor: mainColor }}>
            <div className={styles.sequenceNumber} style={{ color: mainColor }}>3</div>
            Projects
          </div>
          <div className={styles.sequenceDash} style={{ borderTop: `2px dashed ${mainColor}` }}></div>
        </div>

        <div className={styles.sequenceRow}>
          <div className={styles.sequenceItem} style={{ backgroundColor: mainColor }}>
            <div className={styles.sequenceNumber} style={{ color: mainColor }}>4</div>
            Set Up VS Code
          </div>
          <div className={styles.sequenceDash} style={{ borderTop: `2px dashed ${mainColor}` }}></div>
          <div className={styles.sequenceItem} style={{ backgroundColor: mainColor }}>
            <div className={styles.sequenceNumber} style={{ color: mainColor }}>5</div>
            CV Template
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.statsLeft}>
          <div className={styles.avatarStack}>
            {/* Dummy avatars for view stack */}
            <img src="https://i.pravatar.cc/150?img=32" alt="Viewer" />
            <img src="https://i.pravatar.cc/150?img=12" alt="Viewer" />
            <img src="https://i.pravatar.cc/150?img=5" alt="Viewer" />
          </div>
          <span className={styles.viewCount}>{viewCount}</span>
        </div>
        <div className={styles.statsRight}>
          <span className={styles.commentCount}>{commentCount}</span>
          <CommentIcon />
        </div>
      </div>
    </div>
  );
}
