"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ResourceCard from "@/app/components/ui/ResourceCard";
import DashboardHeader, { DashboardFilters } from "../../_components/DashboardHeader";
import { resourceAPI } from "@/app/lib/api/resource";
import { Resource } from "@/app/lib/types/resource";
import { useDashboardData } from "@/app/hooks/useDashboardData";
import { interactionAPI } from "@/app/lib/api/interaction";
import { Comment } from "@/app/lib/types/interaction";
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

// Note: MOCK_SIMILAR has been replaced by data from the API via useDashboardData

export default function ResourceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { displayResources, isLoadingResources } = useDashboardData();
  const [resource, setResource] = useState(MOCK_RESOURCE);
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await interactionAPI.getComments(id);
      if (res.success && res.data?.comments) {
        setComments(res.data.comments);
      }
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handlePostComment = async () => {
    if (!commentInput.trim() || isPostingComment) return;
    setIsPostingComment(true);
    try {
      const res = await interactionAPI.addComment(id, commentInput);
      if (res.success) {
        setCommentInput("");
        fetchComments();
      }
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setIsPostingComment(false);
    }
  };

  const formatPrice = (isFree: boolean, price: number | string, currency: string) => {
    if (isFree || !price || price === "0" || price === 0) return "Free";
    
    let symbol = currency || "$";
    if (symbol.toUpperCase() === "USD") symbol = "$";
    else if (symbol.toUpperCase() === "NGN") symbol = "₦";
    
    return `${symbol}${price}`;
  };

  useEffect(() => {
    const fetchResource = async () => {
      setIsLoading(true);
      try {
        const res = await resourceAPI.getSingleResource(id);
        if (res.success && res.data) {
          const data = res.data;
          setResource({
            id: data._id || data.id,
            variant: "purple", // Keep a default variant or random if preferred
            authorName: data.owner?.name || "Author",
            authorAvatarUrl: data.owner?.avatar || "https://i.pravatar.cc/150",
            title: data.name,
            price: formatPrice(data.isFree, data.price, data.currency),
            description: data.description,
            fileType: data.resourceFile?.format ? `.${data.resourceFile.format}` : ".pdf",
            tags: data.tags || [],
            previewImageUrl: data.coverPhoto || "/assets/pdf1.png",
            viewCount: data.viewCount?.toString() || "0",
            commentCount: 0,
            isOwned: false // Placeholder until ownership logic is implemented
          });
        }
      } catch (error) {
        console.error("Failed to fetch resource details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchResource();
      fetchComments();
    }
  }, [id]);

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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className={styles.spinner}></div>
            </div>
          ) : (
            <>
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
              <span className={styles.commentsCount}>{comments.length > 0 ? comments.length : resource.commentCount}</span>
            </div>

            {comments.map((comment) => (
              <div key={comment._id} className={styles.commentItem}>
                <div>
                  <Image src={comment.user?.avatar || "https://i.pravatar.cc/150"} alt={comment.user?.name || "User"} width={40} height={40} className={styles.commentAvatar} unoptimized />
                </div>
                <div className={styles.commentContent}>
                  <div className={styles.commentAuthor}>{comment.user?.name || "Anonymous"}</div>
                  <p className={styles.commentText}>{comment.comment || comment.content}</p>
                  <div className={styles.commentActions}>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    <button className={styles.commentActionBtn}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
                      Reply
                    </button>
                    <button className={styles.commentActionBtn} style={{ marginLeft: 'auto' }} onClick={() => {
                       // Optional: If you have a like comment API endpoint later
                       alert("Comment liked!");
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                      Like
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div style={{ padding: '20px', color: '#666' }}>No comments yet. Be the first to share your thoughts!</div>
            )}

            <div className={styles.commentInputWrapper}>
              <input 
                type="text" 
                placeholder="Share your thoughts on this resource..." 
                className={styles.commentInput} 
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePostComment();
                }}
                disabled={isPostingComment}
              />
              <button 
                className={styles.postCommentBtn} 
                onClick={handlePostComment}
                disabled={isPostingComment || !commentInput.trim()}
              >
                {isPostingComment ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
          </>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>See Similar</h3>
          <div className={styles.similarGrid}>
            {isLoadingResources ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Loading...</div>
            ) : (
              displayResources.slice(0, 3).map(resource => (
                <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} />
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
