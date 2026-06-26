"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ResourceCard from "@/app/components/ui/ResourceCard";
import DashboardHeader, { DashboardFilters } from "../../_components/DashboardHeader";
import styles from "./page.module.css";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

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

const MOCK_RESOURCE = {
  id: "1",
  variant: "purple" as const,
  authorName: "Stella Della",
  authorAvatarUrl: "https://i.pravatar.cc/150?u=stella",
  title: "Graphic Designer 80% wining rate CV",
  price: "$120",
  description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume. Perfect for both beginners and experienced designers, this guide ensures your CV highlights your skills and experience, making a strong impact on potential employers.",
  fileType: ".pdf",
  tags: ["Design", "CV"],
  previewImageUrl: "/assets/pdf1.png",
  viewCount: "2.5k",
  commentCount: 28000,
  isOwned: false
};

const MOCK_SIMILAR = Array(3).fill(null).map((_, i) => ({
  id: `similar-${i}`,
  variant: (i % 2 === 0 ? "orange" : "purple") as "orange" | "purple",
  authorName: "Stella Della",
  authorAvatarUrl: `https://i.pravatar.cc/150?u=${i}`,
  previewImageUrl: "/assets/pdf1.png",
  title: "Graphic Designer 80% wining rate CV",
  price: i === 1 ? "Free" : "$120",
  description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio exampl..",
  fileType: ".pdf",
  tags: ["Design", "CV"],
  viewCount: "2.5k",
  commentCount: 2,
}));

export default function ResourceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [resource, setResource] = useState(MOCK_RESOURCE);
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  const handleBuyClick = () => {
    if (resource.isOwned) {
      router.push(`/resources/${id}/view`);
      return;
    }

    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/resources/${id}/success`);
    }, 1500); // 1.5s simulated delay
  };

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      <header className={styles.backHeader}>
        <button onClick={() => router.back()} className={styles.backBtn} aria-label="Go back">
          <BackIcon />
        </button>
      </header>

      <div className={styles.mainLayout}>
        <div className={styles.mainContent}>
          {/* Hero Banner */}
          <div className={styles.heroBanner} style={{ backgroundColor: resource.variant === 'purple' ? '#5D2E8C' : '#D03B1F' }}>
            {/* Preview Left Side */}
            <div className={styles.heroPreview}>
              {resource.previewImageUrl && (
                <div className={styles.heroPreviewImageWrapper}>
                  <Image
                    src={resource.previewImageUrl}
                    alt="Preview"
                    layout="fill"
                    className={styles.heroPreviewImage}
                    unoptimized
                  />
                </div>
              )}
            </div>

            <div className={styles.heroContent}>
              <div className={styles.heroHeader}>
                <div className={styles.authorInfo}>
                  <Image src={resource.authorAvatarUrl} alt={resource.authorName} width={32} height={32} className={styles.authorAvatar} unoptimized />
                  <span className={styles.authorName}>{resource.authorName}</span>
                </div>
                <div className={styles.headerActions}>
                  <button className={styles.iconBtn} aria-label="Share"><ShareIcon /></button>
                  <button className={styles.iconBtn} aria-label="Bookmark"><BookmarkIcon /></button>
                </div>
              </div>

              <h1 className={styles.heroTitle}>{resource.title}</h1>
              <div className={styles.heroPrice}>{resource.price}</div>
              <p className={styles.heroDesc}>{resource.description}</p>

              <div className={styles.heroMeta}>
                <div className={styles.fileType}>
                  <DocumentIcon />
                  {resource.fileType}
                </div>
                <div className={styles.tags}>
                  {resource.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className={styles.actionSection}>
            <button
              className={`${styles.buyBtn} ${resource.isOwned ? styles.buyBtnOwned : styles.buyBtnPrimary}`}
              onClick={handleBuyClick}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className={styles.spinner}></div>
                  Processing Payment...
                </>
              ) : (
                resource.isOwned ? 'Open Resource' : 'Buy'
              )}
            </button>
          </div>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <h4>Audience Fit</h4>
              <div className={styles.statBar}>
                <span className={styles.statLabel}>Brand Designers</span>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: '80%' }}></div>
                </div>
                <span className={styles.statValue}>80%</span>
              </div>
              <div className={styles.statBar}>
                <span className={styles.statLabel}>Graphic Designers</span>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: '80%' }}></div>
                </div>
                <span className={styles.statValue}>80%</span>
              </div>
              <div className={styles.statBar}>
                <span className={styles.statLabel}>Illustrator</span>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: '80%' }}></div>
                </div>
                <span className={styles.statValue}>80%</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <h4>Job Fit</h4>
              <div className={styles.statBar}>
                <span className={styles.statLabel}>SAAS</span>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: '80%' }}></div>
                </div>
                <span className={styles.statValue}>80%</span>
              </div>
              <div className={styles.statBar}>
                <span className={styles.statLabel}>Web 3</span>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: '80%' }}></div>
                </div>
                <span className={styles.statValue}>80%</span>
              </div>
              <div className={styles.statBar}>
                <span className={styles.statLabel}>Developer</span>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: '80%' }}></div>
                </div>
                <span className={styles.statValue}>80%</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <h4>Relevancy Score</h4>
              <div className={styles.scoreWrapper}>
                <span className={styles.scoreValue}>96%</span>
                <span className={styles.scoreBadge}>R.S</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className={styles.commentsSection}>
            <div className={styles.commentsHeader}>
              <h3 className={styles.commentsTitle}>Comments</h3>
              <span className={styles.commentsCount}>28K</span>
            </div>

            <div className={styles.commentItem}>
              <div>
                <Image src="https://i.pravatar.cc/150?u=maude" alt="Maude" width={40} height={40} className={styles.commentAvatar} unoptimized />
              </div>
              <div className={styles.commentContent}>
                <div className={styles.commentAuthor}>Maude Hall</div>
                <p className={styles.commentText}>That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.</p>
                <div className={styles.commentActions}>
                  <span>14 min</span>
                  <button className={styles.commentActionBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
                    Reply
                  </button>
                  <button className={styles.commentActionBtn} style={{ marginLeft: 'auto' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                    2
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.commentItem} style={{ paddingLeft: '3.5rem' }}>
              <div>
                <Image src="https://i.pravatar.cc/150?u=rebecca" alt="Rebecca" width={40} height={40} className={styles.commentAvatar} unoptimized />
              </div>
              <div className={styles.commentContent}>
                <div className={styles.commentAuthor}>
                  Rebecca Sugar <span className={styles.commentReplyTo}>&lt; Maude Hall</span>
                </div>
                <p className={styles.commentText}>That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.</p>
                <div className={styles.commentActions}>
                  <span>14 min</span>
                  <button className={styles.commentActionBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
                    Reply
                  </button>
                  <button className={styles.commentActionBtn} style={{ marginLeft: 'auto' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                    2
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.commentInputWrapper}>
              <input type="text" placeholder="Share our thoughts on this resource..." className={styles.commentInput} />
              <button className={styles.postCommentBtn}>Post</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>See Similar</h3>
          <div className={styles.similarGrid}>
            {MOCK_SIMILAR.map(resource => (
              <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
