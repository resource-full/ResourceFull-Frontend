"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardHeader from "../../../_components/DashboardHeader";
import styles from "./page.module.css";
import { useState, useEffect, use, Fragment } from "react";
import { DashboardFilters } from "../../../_components/DashboardHeader";
import { pathwayAPI } from "@/app/lib/api/pathway";
import { formatPrice } from "@/app/hooks/useDashboardData";
import { PathwayBlock } from "@/app/lib/types/pathway";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
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

// Placeholder shown only until the real pathway loads
const EMPTY_PATHWAY = {
  id: "",
  title: "",
  authorName: "",
  authorAvatarUrl: "https://i.pravatar.cc/150",
  price: "",
  description: "",
  tags: [] as string[],
  resourceCount: 0,
  blocks: [] as PathwayBlock[],
};

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function PathwaySuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });
  const [pathway, setPathway] = useState(EMPTY_PATHWAY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await pathwayAPI.getSinglePathway(id);
        if (res.success && res.data) {
          const data = res.data;
          setPathway({
            id: data._id || data.id,
            title: data.name,
            authorName: data.author?.name || "Author",
            authorAvatarUrl: data.author?.avatar || "https://i.pravatar.cc/150",
            price: formatPrice(data.isFree, data.price, data.currency),
            description: data.description,
            tags: data.tags || [],
            resourceCount: data.resourceCount || data.blockCount || 0,
            blocks: data.blocks || [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch purchased pathway:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const mainColor = "#58169c";
  const bgLightColor = "rgba(106, 53, 156, 0.08)";
  const blockRows = chunk(pathway.blocks, 3);

  const handleOpenResource = () => {
    router.push(`/pathways/${id}/view`);
  };

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      <header className={styles.backHeader}>
        <button onClick={() => router.push(`/pathways/${id}`)} className={styles.backBtn} aria-label="Go back">
          <BackIcon />
        </button>
      </header>

      <div className={styles.successContent}>
        <div className={styles.iconWrapper}>
          <div className={styles.checkCircle}>
            <CheckIcon />
          </div>
        </div>

        <h2 className={styles.title}>Payment Successful</h2>
        <p className={styles.subtitle}>
          Thank you for your purchase.<br/>
          Your <strong>pathway</strong> is ready!
        </p>

        {isLoading ? (
          <div className={styles.pathwayCardMock}>Loading...</div>
        ) : (
          <div className={styles.pathwayCardMock}>
            <div className={styles.resourceHeader}>
              <Image
                src={pathway.authorAvatarUrl}
                alt={pathway.authorName}
                width={24}
                height={24}
                className={styles.authorAvatar}
                unoptimized
              />
              <span className={styles.authorName}>{pathway.authorName}</span>
            </div>

            <h3 className={styles.resourceTitle} style={{ color: mainColor }}>{pathway.title}</h3>
            <div className={styles.resourcePrice} style={{ color: mainColor }}>{pathway.price}</div>
            <p className={styles.resourceDesc}>{pathway.description}</p>

            <div className={styles.tags}>
              {pathway.tags.map((tag) => (
                <span key={tag} className={styles.tag} style={{ backgroundColor: mainColor }}>{tag}</span>
              ))}
            </div>

            <div className={styles.resourceCount}>
              <DocumentIcon />
              <span>{pathway.resourceCount} Resources</span>
            </div>

            {blockRows.length > 0 && (
              <div className={styles.sequenceBlock} style={{ backgroundColor: bgLightColor }}>
                {blockRows.map((row, rowIdx) => (
                  <div className={styles.sequenceRow} key={rowIdx}>
                    {row.map((block, idx) => {
                      const number = rowIdx * 3 + idx + 1;
                      return (
                        <Fragment key={block._id || number}>
                          <div className={styles.sequenceItem} style={{ backgroundColor: mainColor }}>
                            <div className={styles.sequenceNumber} style={{ color: mainColor }}>{number}</div>
                            {block.name}
                          </div>
                          {idx < row.length - 1 && (
                            <div className={styles.sequenceDash} style={{ borderTop: `2px dashed ${mainColor}` }}></div>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button className={styles.primaryBtn} onClick={handleOpenResource}>
            Open Resource
          </button>
          <button className={styles.secondaryBtn} onClick={handleGoToProfile}>
            Go to Profile
          </button>
        </div>
      </div>
    </div>
  );
}
