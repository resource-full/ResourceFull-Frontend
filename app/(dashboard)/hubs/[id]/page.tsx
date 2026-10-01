"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HubCard from "@/app/components/ui/HubCard";
import DashboardHeader, { DashboardFilters } from "../../_components/DashboardHeader";
import { hubAPI } from "@/app/lib/api/hub";
import { resourceAPI } from "@/app/lib/api/resource";
import { pathwayAPI } from "@/app/lib/api/pathway";
import { paymentAPI } from "@/app/lib/api/payment";
import { interactionAPI } from "@/app/lib/api/interaction";
import { Hub } from "@/app/lib/types/hub";
import { useDashboardData, formatPrice } from "@/app/hooks/useDashboardData";
import { ResourceCardVariant } from "@/app/components/ui/ResourceCard";
import styles from "./page.module.css";

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
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

const ResourceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.1598 10.448C10.6388 10.4481 11.0271 10.8363 11.0271 11.3153C11.0271 11.7943 10.6388 12.1826 10.1598 12.1826H4.10945C3.63047 12.1826 3.24219 11.7943 3.24219 11.3153C3.24219 10.8363 3.63047 10.448 4.10945 10.448H10.1598Z" fill="currentColor" />
    <path d="M12.6808 7.88963C13.1598 7.88963 13.5481 8.27793 13.5481 8.75689C13.5481 9.23586 13.1598 9.62415 12.6808 9.62415H4.10945C3.63047 9.62415 3.24219 9.23586 3.24219 8.75689C3.2422 8.27792 3.63048 7.88963 4.10945 7.88963H12.6808Z" fill="currentColor" />
    <path d="M12.688 5.37581C13.167 5.37582 13.5553 5.7641 13.5553 6.24307C13.5553 6.72205 13.167 7.11033 12.688 7.11033H4.11662C3.63766 7.11032 3.24936 6.72204 3.24936 6.24307C3.24936 5.76411 3.63766 5.37583 4.11662 5.37581H12.688Z" fill="currentColor" />
    <path d="M12.6808 2.84766C13.1598 2.84766 13.5481 3.23594 13.5481 3.71492C13.5481 4.19389 13.1598 4.58217 12.6808 4.58218H4.10945C3.63047 4.58218 3.24219 4.19389 3.24219 3.71492C3.24219 3.23594 3.63047 2.84766 4.10945 2.84766H12.6808Z" fill="currentColor" />
  </svg>
);

const PathwayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.87747 3.62695C10.4253 3.62696 10.9507 3.8446 11.338 4.23196C11.7254 4.61932 11.943 5.14468 11.943 5.69248C11.943 6.2403 11.7254 6.7657 11.338 7.15306C10.9507 7.54042 10.4253 7.75807 9.87747 7.75807H5.37081C5.0222 7.75807 4.68783 7.89653 4.44133 8.14303C4.19482 8.38954 4.05637 8.72391 4.05637 9.07252C4.05637 9.42112 4.19483 9.75545 4.44133 10.002C4.68783 10.2485 5.0222 10.387 5.37081 10.387H9.78637C9.90327 10.0577 10.1192 9.77272 10.4044 9.57101C10.6897 9.36931 11.0303 9.26078 11.3797 9.26029C11.6895 9.26028 11.9934 9.34543 12.2581 9.50646C12.5228 9.66749 12.7381 9.8982 12.8806 10.1733C13.023 10.4485 13.087 10.7575 13.0657 11.0666C13.0444 11.3757 12.9385 11.673 12.7596 11.926C12.5807 12.1789 12.3358 12.3779 12.0514 12.501C11.7671 12.6242 11.4544 12.6668 11.1475 12.6243C10.8407 12.5817 10.5514 12.4556 10.3113 12.2597C10.0712 12.0638 9.88964 11.8057 9.78637 11.5136H5.37081C4.7234 11.5136 4.10249 11.2564 3.64469 10.7986C3.1869 10.3408 2.92969 9.71994 2.92969 9.07252C2.92969 8.4251 3.1869 7.80419 3.64469 7.3464C4.10249 6.8886 4.72339 6.63139 5.37081 6.63139H9.87747C10.1265 6.63139 10.3653 6.53249 10.5414 6.35643C10.7174 6.18035 10.8163 5.94149 10.8163 5.69248C10.8163 5.44348 10.7174 5.20467 10.5414 5.0286C10.3653 4.85253 10.1265 4.75363 9.87747 4.75363H5.37081C5.22141 4.75363 5.07812 4.69425 4.97247 4.58861C4.86683 4.48296 4.80745 4.33967 4.80745 4.19027C4.80745 4.04087 4.86683 3.89761 4.97247 3.79198C5.07812 3.68633 5.22141 3.62695 5.37081 3.62695H9.87747ZM11.5952 10.4298C11.4923 10.3872 11.3791 10.376 11.2698 10.3978C11.1605 10.4195 11.0601 10.4732 10.9813 10.5519C10.9026 10.6307 10.8489 10.7311 10.8272 10.8404C10.8055 10.9497 10.8166 11.0629 10.8593 11.1659C10.9019 11.2688 10.9741 11.3568 11.0667 11.4187C11.1594 11.4806 11.2683 11.5136 11.3797 11.5136C11.5291 11.5136 11.6724 11.4543 11.778 11.3486C11.8837 11.243 11.943 11.0997 11.943 10.9503C11.943 10.8389 11.91 10.7299 11.8481 10.6373C11.7862 10.5447 11.6982 10.4725 11.5952 10.4298Z" fill="currentColor" />
  </svg>
);

const VARIANTS: ResourceCardVariant[] = ["purple", "orange"];
function getVariant(index: number): ResourceCardVariant {
  return VARIANTS[index % VARIANTS.length];
}

interface HubItem {
  id: string;
  type: "resource" | "pathway";
  title: string;
  variant: ResourceCardVariant;
  price: string;
  tags: string[];
  fileType?: string;
  resourceCount?: number;
  isFree: boolean;
  rawPrice: number;
  currency: string;
}

export default function HubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = use(params);
  const paymentReference = searchParams.get("reference");
  const paymentType = searchParams.get("type");
  const paymentItemId = searchParams.get("itemId");

  const [activeTab, setActiveTab] = useState("All");
  const [ownedItems, setOwnedItems] = useState<Set<string>>(new Set());
  const [processingItems, setProcessingItems] = useState<Set<string>>(new Set());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Downloaded");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [hub, setHub] = useState<Hub | null>(null);
  const [items, setItems] = useState<HubItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { displayHubs, isLoadingHubs } = useDashboardData();

  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  const triggerToast = (message: string = "Downloaded") => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fetch hub details and its resources/pathways
  const fetchHubData = useCallback(async () => {
    try {
      const hubRes = await hubAPI.getSingleHub(id);
      if (hubRes.success && hubRes.data) {
        const hubData = hubRes.data;
        setHub(hubData);

        // Fetch resources that belong to this hub
        const resourceIds = hubData.resources || [];
        const pathwayIds = hubData.pathways || [];

        const fetchedItems: HubItem[] = [];

        // Fetch all resources
        const resourcePromises = resourceIds.map(async (rid, idx) => {
          try {
            const res = await resourceAPI.getSingleResource(rid);
            if (res.success && res.data) {
              const r = res.data;
              return {
                id: r._id || r.id,
                type: "resource" as const,
                title: r.name,
                variant: getVariant(idx),
                price: formatPrice(r.isFree, r.price, r.currency),
                tags: r.tags || [],
                fileType: r.resourceFile?.format ? `.${r.resourceFile.format}` : ".pdf",
                isFree: r.isFree,
                rawPrice: r.price,
                currency: r.currency,
              } as HubItem;
            }
          } catch { /* skip */ }
          return null;
        });

        // Fetch all pathways
        const pathwayPromises = pathwayIds.map(async (pid, idx) => {
          try {
            const res = await pathwayAPI.getSinglePathway(pid);
            if (res.success && res.data) {
              const p = res.data;
              return {
                id: p._id || p.id,
                type: "pathway" as const,
                title: p.name,
                variant: getVariant(idx),
                price: formatPrice(p.isFree, p.price, p.currency),
                tags: p.tags || [],
                resourceCount: p.resourceCount || p.blockCount || 0,
                isFree: p.isFree,
                rawPrice: p.price,
                currency: p.currency,
              } as HubItem;
            }
          } catch { /* skip */ }
          return null;
        });

        const [resourceResults, pathwayResults] = await Promise.all([
          Promise.all(resourcePromises),
          Promise.all(pathwayPromises),
        ]);

        resourceResults.forEach(item => { if (item) fetchedItems.push(item); });
        pathwayResults.forEach(item => { if (item) fetchedItems.push(item); });

        setItems(fetchedItems);

        // Check ownership for each item
        for (const item of fetchedItems) {
          const paymentType = item.type === "resource" ? "Resource" : "Pathway";
          try {
            const status = await paymentAPI.checkPurchaseStatus(paymentType as "Resource" | "Pathway", item.id);
            if (status.success && status.data?.hasPurchased) {
              setOwnedItems(prev => new Set(prev).add(item.id));
            }
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      console.error("Failed to fetch hub details:", err);
      setFetchError("Failed to load this hub. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchHubData();
  }, [fetchHubData]);

  // Handle payment verification when returning from gateway
  useEffect(() => {
    if (!paymentReference || !paymentType || !paymentItemId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await paymentAPI.verifyPayment(paymentReference);
        if (cancelled) return;
        if (res.success && res.data?.status === "success") {
          setOwnedItems(prev => new Set(prev).add(paymentItemId));
          triggerToast("Payment successful!");
          // Clean up the URL
          router.replace(`/hubs/${id}`);
        } else if (res.success && res.data?.status === "pending") {
          setPaymentError("Your payment is still being processed. Please check back shortly.");
        } else {
          setPaymentError("Payment was not completed. Please try again.");
        }
      } catch (err) {
        console.error("Payment verification failed", err);
        setPaymentError("We could not verify your payment. If you were charged, please contact support.");
      } finally {
        if (!cancelled) {
          setProcessingItems(prev => {
            const next = new Set(prev);
            next.delete(paymentItemId);
            return next;
          });
        }
      }
    })();
    return () => { cancelled = true; };
  }, [paymentReference, paymentType, paymentItemId, id, router]);

  const handleSaveToggle = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await interactionAPI.saveResource(id);
      setIsSaved(prev => !prev);
    } catch (err) {
      console.error("Failed to toggle save", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAcquireItem = async (item: HubItem) => {
    if (ownedItems.has(item.id)) {
      // Open item
      router.push(item.type === "resource" ? `/resources/${item.id}` : `/pathways/${item.id}`);
      return;
    }

    // Free items can be acquired directly
    if (item.isFree || item.price === "Free") {
      setOwnedItems(prev => new Set(prev).add(item.id));
      triggerToast("Added to your library!");
      return;
    }

    // Initialize real payment flow
    setProcessingItems(prev => new Set(prev).add(item.id));
    setPaymentError(null);
    try {
      const paymentTypeStr = item.type === "resource" ? "Resource" : "Pathway";
      const res = await paymentAPI.initializePayment(paymentTypeStr as "Resource" | "Pathway", item.id);
      if (res.success && res.data?.authorizationUrl) {
        // Redirect to payment gateway with return params
        const returnUrl = `${window.location.origin}/hubs/${id}?reference=${res.data.reference}&type=${paymentTypeStr}&itemId=${item.id}`;
        const sep = res.data.authorizationUrl.includes("?") ? "&" : "?";
        const redirectUrl = `${res.data.authorizationUrl}${sep}redirect_url=${encodeURIComponent(returnUrl)}`;
        window.location.assign(redirectUrl);
      } else {
        setPaymentError("Failed to initialize payment. Please try again.");
      }
    } catch (err) {
      console.error("Failed to initialize payment:", err);
      setPaymentError("Failed to initialize payment. Please try again.");
    } finally {
      setProcessingItems(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  };

  // Filter items based on active tab
  const filteredItems = items.filter(item => {
    if (activeTab === "All") return true;
    if (activeTab === "Resources") return item.type === "resource";
    if (activeTab === "Pathways") return item.type === "pathway";
    return true;
  });

  const hubName = hub?.name || "Hub";
  const hubDescription = hub?.description || "";
  const hubIndustry = hub?.industry || "";
  const resourceCount = hub?.resources?.length || 0;
  const pathwayCount = hub?.pathways?.length || 0;

  const mainColor = "#6a359c"; // default purple

  // Filter similar hubs to exclude current
  const similarHubs = displayHubs.filter(h => h.id !== id).slice(0, 3);

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      {showToast && (
        <div className={styles.toastAlert}>
          <div className={styles.checkCircle}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          {toastMessage}
        </div>
      )}

      <header className={styles.backHeader}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </header>

      <div className={styles.mainLayout}>
        <div className={styles.mainContent}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <span>Loading hub...</span>
            </div>
          ) : fetchError ? (
            <div className={styles.errorBanner}>{fetchError}</div>
          ) : (
            <>
              {/* Payment error banner */}
              {paymentError && (
                <div className={styles.errorBanner}>{paymentError}</div>
              )}

              <div className={styles.heroCard} style={{ backgroundColor: mainColor }}>
                <div className={styles.heroHeader}>
                  <div className={styles.authorInfo}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://i.pravatar.cc/150?u=stella" alt="Author" width={32} height={32} className={styles.authorAvatar} />
                    <span className={styles.authorName}>{hub?.author?.email || "Author"}</span>
                  </div>
                  <div className={styles.heroActions}>
                    <button className={styles.iconBtn} aria-label="Share">
                      <ShareIcon />
                    </button>
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

                <h1 className={styles.heroTitle}>{hubName}</h1>
                <p className={styles.heroDesc}>{hubDescription}</p>

                <div className={styles.heroStats}>
                  <div className={styles.statItem}>
                    <ResourceIcon />
                    {resourceCount} Resources
                  </div>
                  <div className={styles.statItem}>
                    <PathwayIcon />
                    {pathwayCount} Pathways
                  </div>
                </div>

                <div className={styles.heroTags}>
                  {hubIndustry && (
                    <span key={hubIndustry} className={styles.heroTag} style={{ color: mainColor }}>
                      {hubIndustry}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.filterRow}>
                <div className={styles.tagsContainer}>
                  {["All", "Resources", "Pathways"].map(tab => (
                    <button
                      key={tab}
                      className={`${styles.exploreTag} ${activeTab === tab ? styles.exploreTagActive : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === "Resources" && <ResourceIcon />}
                      {tab === "Pathways" && <PathwayIcon />}
                      {tab}
                    </button>
                  ))}
                </div>

                <button className={styles.filterBtn} aria-label="Filter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button>
              </div>

              <div className={styles.itemList}>
                {filteredItems.length === 0 ? (
                  <div className={styles.emptyItems}>
                    {items.length === 0
                      ? "This hub doesn't have any resources or pathways yet."
                      : "No items match this filter."}
                  </div>
                ) : (
                  filteredItems.map(item => (
                    <div key={item.id} className={styles.listItem}>
                      <div className={`${styles.itemCard} ${item.variant === 'purple' ? styles.variantPurple : styles.variantOrange}`}>
                        <div className={styles.itemLeft}>
                          <h3 className={styles.itemTitle}>
                            {item.type === 'resource' ? <ResourceIcon /> : <PathwayIcon />}
                            {item.title}
                          </h3>
                          <div className={styles.itemPrice}>{item.price}</div>

                          <div className={styles.itemTags}>
                            {item.tags.map(tag => (
                              <span key={tag} className={styles.itemTag}>{tag}</span>
                            ))}
                          </div>
                        </div>

                        <div className={styles.itemFooterIcon}>
                          {item.type === 'resource' ? (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                              {item.fileType || ".pdf"}
                            </>
                          ) : (
                            <>
                              <ResourceIcon />
                              {item.resourceCount || 0} Resources
                            </>
                          )}
                        </div>
                      </div>

                      <div className={styles.itemAction}>
                        {!ownedItems.has(item.id) && (
                          <span className={styles.actionPrice}>{item.price === "Free" ? "Free" : item.price}</span>
                        )}
                        <button
                          className={`${styles.actionBtn} ${ownedItems.has(item.id) ? styles.actionBtnOutline : ''}`}
                          onClick={() => handleAcquireItem(item)}
                          disabled={processingItems.has(item.id)}
                        >
                          {processingItems.has(item.id) ? (
                            "..."
                          ) : ownedItems.has(item.id) ? (
                            "Open"
                          ) : item.isFree || item.price === "Free" ? (
                            "Get"
                          ) : (
                            "Buy"
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>See Similar</h2>
          <div className={styles.similarGrid}>
            {isLoadingHubs ? (
              <div className={styles.sidebarLoading}>Loading similar hubs...</div>
            ) : similarHubs.length > 0 ? (
              similarHubs.map((hub) => (
                <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} />
              ))
            ) : (
              <div className={styles.sidebarLoading}>No similar hubs found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
