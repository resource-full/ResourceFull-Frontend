"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HubCard.module.css";

export type HubCardVariant = "purple" | "orange";

interface HubCardProps {
  id: string | number;
  variant: HubCardVariant;
  authorName: string;
  authorAvatarUrl: string;
  title: string;
  price: string;
  description: string;
  tags: string[];
  resourceCount: number;
  pathwayCount: number;
  viewCount: string;
  commentCount: number | string;
  href?: string;
  isPurchased?: boolean;
  isSaved?: boolean;
}

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const BookmarkedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2C11.7163 2 13.4088 2.1056 15.0703 2.31055C16.1944 2.44939 17 3.41385 17 4.5166V17.25C17 17.5078 16.8676 17.7475 16.6494 17.8848C16.4313 18.022 16.1582 18.0373 15.9258 17.9258L10 15.082L4.07422 17.9258C3.84185 18.0373 3.56873 18.022 3.35059 17.8848C3.1324 17.7475 3 17.5078 3 17.25V4.5166C3 3.41385 3.80562 2.44939 4.92969 2.31055C6.59124 2.1056 8.28365 2 10 2Z" fill="#EDFD02" />
  </svg>
);

const CommentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.33203 4C1.33203 2.89543 2.22746 2 3.33203 2H12.6654C13.7699 2 14.6654 2.89543 14.6654 4V9.33333C14.6654 10.4379 13.7699 11.3333 12.6654 11.3333H10.9415L8.4701 13.8047C8.20975 14.0651 7.78764 14.0651 7.52729 13.8047L5.05589 11.3333H3.33203C2.22746 11.3333 1.33203 10.4379 1.33203 9.33333V4ZM3.33203 3.33333C2.96384 3.33333 2.66536 3.63181 2.66536 4V9.33333C2.66536 9.70152 2.96384 10 3.33203 10H5.33203C5.50884 10 5.67841 10.0702 5.80344 10.1953L7.9987 12.3905L10.194 10.1953C10.319 10.0702 10.4886 10 10.6654 10H12.6654C13.0336 10 13.332 9.70152 13.332 9.33333V4C13.332 3.63181 13.0336 3.33333 12.6654 3.33333H3.33203ZM3.9987 5.33333C3.9987 4.96514 4.29717 4.66667 4.66536 4.66667H11.332C11.7002 4.66667 11.9987 4.96514 11.9987 5.33333C11.9987 5.70152 11.7002 6 11.332 6H4.66536C4.29717 6 3.9987 5.70152 3.9987 5.33333ZM3.9987 8C3.9987 7.63181 4.29717 7.33333 4.66536 7.33333H7.33203C7.70022 7.33333 7.9987 7.63181 7.9987 8C7.9987 8.36819 7.70022 8.66667 7.33203 8.66667H4.66536C4.29717 8.66667 3.9987 8.36819 3.9987 8Z" fill="#2C2C2C" />
  </svg>
);

const ResourceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.1598 10.448C10.6388 10.4481 11.0271 10.8363 11.0271 11.3153C11.0271 11.7943 10.6388 12.1826 10.1598 12.1826H4.10945C3.63047 12.1826 3.24219 11.7943 3.24219 11.3153C3.24219 10.8363 3.63047 10.448 4.10945 10.448H10.1598Z" fill="#707070" />
    <path d="M12.6808 7.88963C13.1598 7.88963 13.5481 8.27793 13.5481 8.75689C13.5481 9.23586 13.1598 9.62415 12.6808 9.62415H4.10945C3.63047 9.62415 3.24219 9.23586 3.24219 8.75689C3.2422 8.27792 3.63048 7.88963 4.10945 7.88963H12.6808Z" fill="#707070" />
    <path d="M12.688 5.37581C13.167 5.37582 13.5553 5.7641 13.5553 6.24307C13.5553 6.72205 13.167 7.11033 12.688 7.11033H4.11662C3.63766 7.11032 3.24936 6.72204 3.24936 6.24307C3.24936 5.76411 3.63766 5.37583 4.11662 5.37581H12.688Z" fill="#707070" />
    <path d="M12.6808 2.84766C13.1598 2.84766 13.5481 3.23594 13.5481 3.71492C13.5481 4.19389 13.1598 4.58217 12.6808 4.58218H4.10945C3.63047 4.58218 3.24219 4.19389 3.24219 3.71492C3.24219 3.23594 3.63047 2.84766 4.10945 2.84766H12.6808Z" fill="#707070" />
  </svg>
);

const PathwayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.87747 3.62695C10.4253 3.62696 10.9507 3.8446 11.338 4.23196C11.7254 4.61932 11.943 5.14468 11.943 5.69248C11.943 6.2403 11.7254 6.7657 11.338 7.15306C10.9507 7.54042 10.4253 7.75807 9.87747 7.75807H5.37081C5.0222 7.75807 4.68783 7.89653 4.44133 8.14303C4.19482 8.38954 4.05637 8.72391 4.05637 9.07252C4.05637 9.42112 4.19483 9.75545 4.44133 10.002C4.68783 10.2485 5.0222 10.387 5.37081 10.387H9.78637C9.90327 10.0577 10.1192 9.77272 10.4044 9.57101C10.6897 9.36931 11.0303 9.26078 11.3797 9.26029C11.6895 9.26028 11.9934 9.34543 12.2581 9.50646C12.5228 9.66749 12.7381 9.8982 12.8806 10.1733C13.023 10.4485 13.087 10.7575 13.0657 11.0666C13.0444 11.3757 12.9385 11.673 12.7596 11.926C12.5807 12.1789 12.3358 12.3779 12.0514 12.501C11.7671 12.6242 11.4544 12.6668 11.1475 12.6243C10.8407 12.5817 10.5514 12.4556 10.3113 12.2597C10.0712 12.0638 9.88964 11.8057 9.78637 11.5136H5.37081C4.7234 11.5136 4.10249 11.2564 3.64469 10.7986C3.1869 10.3408 2.92969 9.71994 2.92969 9.07252C2.92969 8.4251 3.1869 7.80419 3.64469 7.3464C4.10249 6.8886 4.72339 6.63139 5.37081 6.63139H9.87747C10.1265 6.63139 10.3653 6.53249 10.5414 6.35643C10.7174 6.18035 10.8163 5.94149 10.8163 5.69248C10.8163 5.44348 10.7174 5.20467 10.5414 5.0286C10.3653 4.85253 10.1265 4.75363 9.87747 4.75363H5.37081C5.22141 4.75363 5.07812 4.69425 4.97247 4.58861C4.86683 4.48296 4.80745 4.33967 4.80745 4.19027C4.80745 4.04087 4.86683 3.89761 4.97247 3.79198C5.07812 3.68633 5.22141 3.62695 5.37081 3.62695H9.87747ZM11.5952 10.4298C11.4923 10.3872 11.3791 10.376 11.2698 10.3978C11.1605 10.4195 11.0601 10.4732 10.9813 10.5519C10.9026 10.6307 10.8489 10.7311 10.8272 10.8404C10.8055 10.9497 10.8166 11.0629 10.8593 11.1659C10.9019 11.2688 10.9741 11.3568 11.0667 11.4187C11.1594 11.4806 11.2683 11.5136 11.3797 11.5136C11.5291 11.5136 11.6724 11.4543 11.778 11.3486C11.8837 11.243 11.943 11.0997 11.943 10.9503C11.943 10.8389 11.91 10.7299 11.8481 10.6373C11.7862 10.5447 11.6982 10.4725 11.5952 10.4298Z" fill="#707070" />
  </svg>
);

export default function HubCard({
  variant,
  authorName,
  authorAvatarUrl,
  title,
  price,
  description,
  tags,
  resourceCount,
  pathwayCount,
  viewCount,
  commentCount,
  href,
  isPurchased,
  isSaved,
}: HubCardProps) {
  const tabColor = variant === "purple" ? "#6a359c" : "#c4452a";

  const cardContent = (
    <div className={styles.cardWrapper}>
      <div className={styles.tab} style={{ backgroundColor: tabColor }} />
      <div className={styles.mainCard}>
        <div className={styles.header}>
          <div className={styles.authorInfo}>
            <img src={authorAvatarUrl} alt={authorName} className={styles.authorAvatar} />
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

        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <ResourceIcon />
            {resourceCount}
          </div>
          <div className={styles.statBox}>
            <PathwayIcon />
            {pathwayCount}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.statsLeft}>
            <div className={styles.avatarStack}>
              <img src="https://i.pravatar.cc/150?img=32" alt="Viewer" />
              <img src="https://i.pravatar.cc/150?img=12" alt="Viewer" />
              <img src="https://i.pravatar.cc/150?img=5" alt="Viewer" />
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
              <CommentIcon />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
