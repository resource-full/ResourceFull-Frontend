"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { pathwayAPI } from "@/app/lib/api/pathway";
import { resourceAPI } from "@/app/lib/api/resource";
import { paymentAPI } from "@/app/lib/api/payment";
import { formatPrice } from "@/app/hooks/useDashboardData";
import { Pathway } from "@/app/lib/types/pathway";
import { Resource } from "@/app/lib/types/resource";
import styles from "./page.module.css";

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
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

interface IntroStep {
  type: "text";
  key: string;
  order: number;
  title: string;
  description: string;
}

interface ResourceStep {
  type: "resource";
  key: string;
  order: number;
  resourceId: string;
  resourceTitle: string;
  priceLabel: string;
  tags: string[];
  fileType: string;
  isFree: boolean;
  variant: "purple" | "orange";
}

type StepData = IntroStep | ResourceStep;

function isPopulatedResource(resource: unknown): resource is Resource {
  return !!resource && typeof resource === "object" && "name" in resource;
}

export default function PathwayViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pathway, setPathway] = useState<Pathway | null>(null);
  const [steps, setSteps] = useState<StepData[]>([]);
  const [ownedResources, setOwnedResources] = useState<Set<string>>(new Set());
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await pathwayAPI.getSinglePathway(id);
        if (!res.success || !res.data) {
          if (!cancelled) setError("Failed to load this pathway.");
          return;
        }
        const data = res.data;
        if (cancelled) return;
        setPathway(data);

        const sortedBlocks = [...(data.blocks || [])].sort((a, b) => a.order - b.order);

        // Resolve full resource details for every "resource" block
        const resolvedBlocks = await Promise.all(
          sortedBlocks.map(async (block) => {
            if (block.type !== "resource") return { block, resource: null as Resource | null };
            if (isPopulatedResource(block.resource)) {
              return { block, resource: block.resource };
            }
            const resourceId = block.resource as string | undefined;
            if (!resourceId) return { block, resource: null };
            try {
              const resourceRes = await resourceAPI.getSingleResource(resourceId);
              return { block, resource: resourceRes.success ? resourceRes.data : null };
            } catch (err) {
              console.error("Failed to load embedded resource", err);
              return { block, resource: null };
            }
          })
        );
        if (cancelled) return;

        // Check purchase status for every non-free resource block
        const initiallyOwned = new Set<string>();
        await Promise.all(
          resolvedBlocks.map(async ({ resource }) => {
            if (!resource) return;
            const resourceId = resource._id || resource.id;
            if (resource.isFree) {
              initiallyOwned.add(resourceId);
              return;
            }
            try {
              const status = await paymentAPI.checkPurchaseStatus("Resource", resourceId);
              if (status.success && status.data?.hasPurchased) {
                initiallyOwned.add(resourceId);
              }
            } catch (err) {
              console.error("Failed to check purchase status", err);
            }
          })
        );
        if (cancelled) return;
        setOwnedResources(initiallyOwned);

        const builtSteps: StepData[] = resolvedBlocks.map(({ block, resource }, index) => {
          if (block.type === "text" || !resource) {
            return {
              type: "text",
              key: block._id || `text-${index}`,
              order: block.order ?? index + 1,
              title: block.name || "Introduction",
              description: block.shortDescription || "",
            };
          }
          const resourceId = resource._id || resource.id;
          return {
            type: "resource",
            key: block._id || `resource-${index}`,
            order: block.order ?? index + 1,
            resourceId,
            resourceTitle: resource.name,
            priceLabel: formatPrice(resource.isFree, resource.price, resource.currency),
            tags: resource.tags || [],
            fileType: resource.resourceFile?.format ? `.${resource.resourceFile.format}` : "",
            isFree: resource.isFree,
            variant: index % 2 === 0 ? "purple" : "orange",
          };
        });
        setSteps(builtSteps);
      } catch (err) {
        console.error("Failed to load pathway for viewing:", err);
        if (!cancelled) setError("Failed to load this pathway. Please try again.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => { cancelled = true; };
  }, [id]);

  const handleClose = () => {
    router.push(`/pathways/${id}`);
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAction = async (resourceId: string, isFree: boolean) => {
    if (processingId) return;

    if (ownedResources.has(resourceId)) {
      setProcessingId(resourceId);
      try {
        const res = await resourceAPI.downloadResource(resourceId);
        if (res.success && res.data?.downloadUrl) {
          window.open(res.data.downloadUrl, "_blank", "noopener,noreferrer");
        }
        triggerToast();
      } catch (err) {
        console.error("Failed to open resource", err);
      } finally {
        setProcessingId(null);
      }
      return;
    }

    if (isFree) {
      setProcessingId(resourceId);
      try {
        const res = await resourceAPI.downloadResource(resourceId);
        if (res.success && res.data?.downloadUrl) {
          window.open(res.data.downloadUrl, "_blank", "noopener,noreferrer");
        }
        setOwnedResources((prev) => new Set(prev).add(resourceId));
        triggerToast();
      } catch (err) {
        console.error("Failed to get free resource", err);
      } finally {
        setProcessingId(null);
      }
      return;
    }

    setProcessingId(resourceId);
    try {
      const res = await paymentAPI.initializePayment("Resource", resourceId);
      if (res.success && res.data?.authorizationUrl) {
        window.location.assign(res.data.authorizationUrl);
      } else {
        setProcessingId(null);
      }
    } catch (err) {
      console.error("Failed to initialize payment:", err);
      setProcessingId(null);
    }
  };

  const mainColor = "#58169c";

  return (
    <div className={styles.viewerContainer}>
      <header className={styles.viewerHeader} style={{ backgroundColor: mainColor }}>
        <div className={styles.headerLeft}>
          <button onClick={handleClose} className={styles.closeBtn} aria-label="Close viewer">
            <CloseIcon />
          </button>
          <div className={styles.pathwayTitle}>{pathway?.name || "Pathway"}</div>
        </div>

        {pathway?.author && (
          <div className={styles.headerRight}>
            <div className={styles.authorInfo}>
              <Image
                src={pathway.author.avatar || "https://i.pravatar.cc/150"}
                alt={pathway.author.name || "Author"}
                width={28}
                height={28}
                className={styles.authorAvatar}
                unoptimized
              />
              <span>{pathway.author.name}</span>
            </div>
          </div>
        )}
      </header>

      {showToast && (
        <div className={styles.toastAlert}>
          <div className={styles.checkCircle}>
            <CheckIcon />
          </div>
          Downloaded
        </div>
      )}

      <div className={styles.contentArea}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <span>Loading pathway...</span>
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <span>{error}</span>
            <button className={styles.actionBtn} onClick={() => router.push(`/pathways/${id}`)}>
              Back to Pathway
            </button>
          </div>
        ) : (
          <div className={styles.timelineContainer}>
            {steps.map((step, index) => (
              <div key={step.key} className={styles.stepItem}>
                <div className={styles.stepNumber}>{index + 1}</div>

                <div className={styles.stepContent}>
                  {step.type === "text" ? (
                    <div className={styles.introCard}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <div className={styles.introDescBox}>{step.description}</div>
                    </div>
                  ) : (
                    <div>
                      <div className={styles.resourcePrompt}>After reading the above instructions, access this document.</div>

                      <div className={styles.resourceCardRow}>
                        <div className={`${styles.embeddedResourceCard} ${step.variant === "orange" ? styles.variantOrange : ""}`}>
                          <div className={styles.embeddedLeft}>
                            <div className={styles.embeddedTitle}>
                              <MenuIcon />
                              {step.resourceTitle}
                            </div>
                            <div className={styles.embeddedPrice}>{step.priceLabel}</div>
                            <div className={styles.embeddedTags}>
                              {step.tags.map((tag) => (
                                <span key={tag} className={styles.embeddedTag}>{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className={styles.fileTypeIcon}>
                            <DocumentIcon />
                            {step.fileType}
                          </div>
                        </div>

                        <div className={styles.resourceAction}>
                          {!ownedResources.has(step.resourceId) && (
                            <span className={styles.actionPrice}>{step.priceLabel}</span>
                          )}
                          <button
                            className={`${styles.actionBtn} ${ownedResources.has(step.resourceId) ? styles.actionBtnOutline : ""}`}
                            onClick={() => handleAction(step.resourceId, step.isFree)}
                            disabled={processingId === step.resourceId}
                          >
                            {processingId === step.resourceId
                              ? "Processing..."
                              : ownedResources.has(step.resourceId)
                                ? "Open"
                                : (step.isFree ? "Get" : "Buy")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {steps.length === 0 && (
              <div className={styles.errorContainer}>This pathway has no content yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
