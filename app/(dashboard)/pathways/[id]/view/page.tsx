"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, use } from "react";
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

const MOCK_PATHWAY = {
  id: "1",
  title: "Become a Full Stack Developer in 3 Months",
  authorName: "Stella Della",
  authorAvatarUrl: "https://i.pravatar.cc/150?u=stella",
  steps: [
    { type: "intro", id: 1, title: "Introduction", description: "Description" },
    { type: "resource", id: 2, resourceTitle: "Graphic Designer 80% wining rate CV", variant: "purple", price: "$120", tags: ["Design", "CV"], fileType: ".pdf", isFree: true, externalPrice: "Free" },
    { type: "intro", id: 3, title: "Introduction", description: "Description" },
    { type: "resource", id: 4, resourceTitle: "Graphic Designer 80% wining rate CV", variant: "orange", price: "Free", tags: ["Design", "CV"], fileType: ".pdf", isFree: false, externalPrice: "$20" }
  ]
};

export default function PathwayViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [ownedResources, setOwnedResources] = useState<number[]>([]);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => {
    router.push(`/pathways/${id}`);
  };

  const handleAction = (stepId: number, isFree: boolean) => {
    if (ownedResources.includes(stepId)) return;

    if (isFree) {
      setOwnedResources([...ownedResources, stepId]);
      triggerToast();
    } else {
      setProcessingId(stepId);
      setTimeout(() => {
        setProcessingId(null);
        setOwnedResources([...ownedResources, stepId]);
        triggerToast();
      }, 1500);
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className={styles.viewerContainer}>
      <header className={styles.viewerHeader}>
        <div className={styles.headerLeft}>
          <button onClick={handleClose} className={styles.closeBtn} aria-label="Close viewer">
            <CloseIcon />
          </button>
          <div className={styles.pathwayTitle}>{MOCK_PATHWAY.title}</div>
        </div>
        
        <div className={styles.headerRight}>
          <div className={styles.authorInfo}>
            <Image
              src={MOCK_PATHWAY.authorAvatarUrl}
              alt={MOCK_PATHWAY.authorName}
              width={28}
              height={28}
              className={styles.authorAvatar}
              unoptimized
            />
            <span>{MOCK_PATHWAY.authorName}</span>
          </div>
        </div>
      </header>

      {/* Floating Toast Alert */}
      {showToast && (
        <div className={styles.toastAlert}>
          <div className={styles.checkCircle}>
            <CheckIcon />
          </div>
          Downloaded
        </div>
      )}

      <div className={styles.contentArea}>
        <div className={styles.timelineContainer}>
          {MOCK_PATHWAY.steps.map((step, index) => (
            <div key={step.id} className={styles.stepItem}>
              <div className={styles.stepNumber}>{index + 1}</div>
              
              <div className={styles.stepContent}>
                {step.type === "intro" ? (
                  <div className={styles.introCard}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <div className={styles.introDescBox}>
                      {step.description}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={styles.resourcePrompt}>After reading the above instructions, access this document.</div>
                    
                    <div className={styles.resourceCardRow}>
                      <div className={`${styles.embeddedResourceCard} ${step.variant === 'orange' ? styles.variantOrange : ''}`}>
                        <div className={styles.embeddedLeft}>
                          <div className={styles.embeddedTitle}>
                            <MenuIcon />
                            {step.resourceTitle}
                          </div>
                          <div className={styles.embeddedPrice}>{step.price}</div>
                          <div className={styles.embeddedTags}>
                            {step.tags?.map(tag => (
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
                        {!ownedResources.includes(step.id) && (
                          <span className={styles.actionPrice}>{step.externalPrice}</span>
                        )}
                        <button 
                          className={`${styles.actionBtn} ${ownedResources.includes(step.id) ? styles.actionBtnOutline : ''}`}
                          onClick={() => handleAction(step.id, step.isFree ?? false)}
                          disabled={processingId === step.id}
                        >
                          {processingId === step.id ? 'Processing...' : 
                           ownedResources.includes(step.id) ? 'Open' : 
                           (step.isFree ? 'Get' : 'Buy')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
