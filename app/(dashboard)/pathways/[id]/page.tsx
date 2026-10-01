"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import PathwayCard from "@/app/components/ui/PathwayCard";
import DashboardHeader, { DashboardFilters } from "../../_components/DashboardHeader";
import { pathwayAPI } from "@/app/lib/api/pathway";
import { interactionAPI } from "@/app/lib/api/interaction";
import { paymentAPI } from "@/app/lib/api/payment";
import { Comment, InteractionStats } from "@/app/lib/types/interaction";
import { useDashboardData } from "@/app/hooks/useDashboardData";
import { formatPrice } from "@/app/hooks/useDashboardData";
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

const MOCK_PATHWAY = {
  id: "1",
  variant: "purple" as const,
  authorName: "Stella Della",
  authorAvatarUrl: "https://i.pravatar.cc/150?u=stella",
  title: "Become a Full Stack Developer in 3 Months",
  price: "Free",
  description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume. Perfect for both beginners and experienced designers, this guide ensures your CV highlights your skills and experience, making a strong impression on potential employers.",
  tags: ["Design", "CV"],
  resourceCount: 20,
  viewCount: "2.5k",
  commentCount: 28000,
  isOwned: false,
  blocks: [
    { name: "Intro", order: 1 },
    { name: "Tools", order: 2 },
    { name: "Projects", order: 3 },
    { name: "Set Up VS Code", order: 4 },
    { name: "CV Template", order: 5 },
  ] as any[],
};

export default function PathwayDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentReference = searchParams.get("reference");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState<InteractionStats | null>(null);
  const { displayPathways, isLoadingPathways } = useDashboardData();
  const [pathway, setPathway] = useState(MOCK_PATHWAY);
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      // The interaction API is resource-scoped; we attempt to fetch comments
      // using the pathway id in case the backend supports it.
      const res = await interactionAPI.getComments(id);
      if (res.success && res.data?.comments) {
        setComments(res.data.comments);
      }
    } catch (err) {
      // Non-fatal — comments may not be supported for pathways yet
      console.error("Failed to load comments", err);
    }
  }, [id]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await interactionAPI.getInteractionStats(id);
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error("Failed to load interaction stats", err);
    }
  }, [id]);

  const checkOwnership = useCallback(async () => {
    try {
      const status = await paymentAPI.checkPurchaseStatus("Pathway", id);
      if (status.success && status.data) {
        setPathway(prev => ({ ...prev, isOwned: status.data.hasPurchased }));
      }
    } catch (err) {
      console.error("Failed to check purchase status", err);
    }
  }, [id]);

  // If returning from payment gateway with a reference, verify payment
  useEffect(() => {
    if (!paymentReference) return;
    let cancelled = false;
    (async () => {
      setIsProcessing(true);
      setPaymentError(null);
      try {
        const res = await paymentAPI.verifyPayment(paymentReference);
        if (cancelled) return;
        if (res.success && res.data?.status === "success") {
          setPathway(prev => ({ ...prev, isOwned: true }));
          router.replace(`/pathways/${id}/success`);
        } else if (res.success && res.data?.status === "pending") {
          setPaymentError("Your payment is still being processed. Please check back shortly.");
        } else {
          setPaymentError("Payment was not completed. Please try again.");
        }
      } catch (err) {
        console.error("Payment verification failed", err);
        setPaymentError("We could not verify your payment. If you were charged, please contact support.");
      } finally {
        if (!cancelled) setIsProcessing(false);
      }
    })();
    return () => { cancelled = true; };
  }, [paymentReference, id, router]);

  const handlePostComment = async () => {
    if (!commentInput.trim() || isPostingComment) return;
    setIsPostingComment(true);
    setCommentError(null);
    try {
      const res = await interactionAPI.addComment(id, commentInput);
      if (res.success) {
        setCommentInput("");
        fetchComments();
        fetchStats();
      }
    } catch (err) {
      console.error("Failed to post comment", err);
      setCommentError("Failed to post comment. Please try again.");
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleSaveToggle = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      // Save uses the resource-scoped endpoint; pathway ids may or may not be accepted
      await interactionAPI.saveResource(id);
      setIsSaved(prev => !prev);
    } catch (err) {
      console.error("Failed to toggle save", err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchPathway = async () => {
      try {
        const res = await pathwayAPI.getSinglePathway(id);
        if (res.success && res.data) {
          const data = res.data;
          setPathway({
            id: data._id || data.id,
            variant: "purple",
            authorName: data.author?.name || "Author",
            authorAvatarUrl: data.author?.avatar || "https://i.pravatar.cc/150",
            title: data.name,
            price: formatPrice(data.isFree, data.price, data.currency),
            description: data.description,
            tags: data.tags || [],
            resourceCount: data.resourceCount || data.blockCount || 0,
            viewCount: data.viewCount?.toString() || "0",
            commentCount: stats?.comments ?? 0,
            isOwned: false,
            blocks: data.blocks || [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch pathway details:", error);
        setFetchError("Failed to load this pathway. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      void fetchPathway();
      void fetchComments();
      void fetchStats();
      void checkOwnership();
    }
  }, [id, fetchComments, fetchStats, checkOwnership, stats?.comments]);

  const mainColor = pathway.variant === "purple" ? "#6a359c" : "#c4452a";
  const bgLightColor = pathway.variant === "purple" ? "rgba(106, 53, 156, 0.08)" : "rgba(196, 69, 42, 0.08)";

  const handleBuyClick = async () => {
    if (pathway.isOwned) {
      router.push(`/pathways/${id}/view`);
      return;
    }

    // Free pathways can be opened directly
    if (pathway.price === "Free") {
      setPathway(prev => ({ ...prev, isOwned: true }));
      router.push(`/pathways/${id}/success`);
      return;
    }

    // Initialize real payment flow
    setIsProcessing(true);
    setPaymentError(null);
    try {
      const res = await paymentAPI.initializePayment("Pathway", id);
      if (res.success && res.data?.authorizationUrl) {
        window.location.href = res.data.authorizationUrl;
      } else {
        setPaymentError("Failed to initialize payment. Please try again.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Failed to initialize payment:", err);
      setPaymentError("Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const commentCount = comments.length > 0 ? comments.length : (stats?.comments ?? pathway.commentCount);

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
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <span>Loading pathway...</span>
            </div>
          ) : fetchError ? (
            <div className={styles.errorBanner}>{fetchError}</div>
          ) : (
            <>
          {/* Payment error banner */}
          {paymentError && (
            <div className={styles.errorBanner}>{paymentError}</div>
          )}

          <div className={styles.pathwayInfoCard}>
            <div className={styles.infoHeader}>
              <div className={styles.authorInfo}>
                <Image src={pathway.authorAvatarUrl} alt={pathway.authorName} width={32} height={32} className={styles.authorAvatar} unoptimized />
                <span className={styles.authorName}>{pathway.authorName}</span>
              </div>
              <div className={styles.headerActions}>
                <button className={styles.iconBtn} aria-label="Share"><ShareIcon /></button>
                <button
                  className={styles.iconBtn}
                  aria-label="Bookmark"
                  onClick={handleSaveToggle}
                  disabled={isSaving}
                  style={isSaved ? { background: 'rgba(237, 253, 2, 0.3)' } : undefined}
                >
                  <BookmarkIcon />
                </button>
              </div>
            </div>

            <h1 className={styles.pathwayTitle} style={{ color: mainColor }}>{pathway.title}</h1>
            <div className={styles.pathwayPrice} style={{ color: mainColor }}>{pathway.price}</div>
            <p className={styles.pathwayDesc}>{pathway.description}</p>

            <div className={styles.tagsContainer}>
              {pathway.tags.map(tag => (
                <span key={tag} className={styles.tag} style={{ backgroundColor: mainColor }}>{tag}</span>
              ))}
            </div>

            <div className={styles.resourceCount}>
              <DocumentIcon />
              <span>{pathway.resourceCount} Resources</span>
            </div>

            <div className={styles.sequenceBlock} style={{ backgroundColor: bgLightColor }}>
              <div className={styles.sequenceRow}>
                {(pathway.blocks && pathway.blocks.length > 0
                  ? pathway.blocks
                  : [
                      { name: "Intro", order: 1 },
                      { name: "Tools", order: 2 },
                      { name: "Projects", order: 3 },
                      { name: "Set Up VS Code", order: 4 },
                      { name: "CV Template", order: 5 },
                    ]
                ).map((block: any, idx: number) => (
                  <div key={`block-${idx}`} className={styles.sequenceItem} style={{ backgroundColor: mainColor }}>
                    <div className={styles.sequenceNumber} style={{ color: mainColor }}>{block.order || idx + 1}</div>
                    {block.name}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Area */}
          <div className={styles.actionSection}>
            <button
              className={`${styles.buyBtn} ${pathway.isOwned ? styles.buyBtnOwned : styles.buyBtnPrimary}`}
              onClick={handleBuyClick}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className={styles.spinner}></div>
                  {paymentReference ? "Verifying Payment..." : "Redirecting to payment..."}
                </>
              ) : (
                pathway.isOwned ? 'Open Pathway' : (pathway.price === "Free" ? 'Get' : 'Get')
              )}
            </button>
          </div>

          {/* Interaction Stats */}
          {(stats || isSaved) && (
            <div className={styles.interactionStats}>
              {stats && <span className={styles.interactionStat}>{stats.likes} likes</span>}
              {stats && <span className={styles.interactionStat}>{stats.saves} saves</span>}
              {stats && <span className={styles.interactionStat}>{stats.shares} shares</span>}
              {isSaved && <span className={styles.interactionStat}>You saved this</span>}
            </div>
          )}

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
              <span className={styles.commentsCount}>{commentCount}</span>
            </div>

            {commentError && (
              <div className={styles.commentError}>{commentError}</div>
            )}

            {comments.length > 0 ? (
              comments.map((comment) => (
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
                      <button
                        className={styles.commentActionBtn}
                        style={{ marginLeft: 'auto' }}
                        onClick={async () => {
                          try {
                            if (comment._id) {
                              await interactionAPI.deleteComment(comment._id);
                              fetchComments();
                              fetchStats();
                            }
                          } catch (err) {
                            console.error("Failed to delete comment", err);
                          }
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noComments}>No comments yet. Be the first to share your thoughts!</div>
            )}

            <div className={styles.commentInputWrapper}>
              <input
                type="text"
                placeholder="Share your thoughts on this pathway..."
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
            {isLoadingPathways ? (
              <div className={styles.sidebarLoading}>Loading similar pathways...</div>
            ) : displayPathways.length > 0 ? (
              displayPathways
                .filter(p => p.id !== id)
                .slice(0, 3)
                .map(pathway => (
                  <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} />
                ))
            ) : (
              <div className={styles.sidebarLoading}>No similar pathways found.</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
