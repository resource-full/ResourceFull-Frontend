"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardHeader from "../../../_components/DashboardHeader";
import styles from "./page.module.css";
import { useState, useEffect, use } from "react";
import { DashboardFilters } from "../../../_components/DashboardHeader";
import { resourceAPI } from "@/app/lib/api/resource";
import { formatPrice } from "@/app/hooks/useDashboardData";

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

// Placeholder shown only until the real resource loads
const EMPTY_RESOURCE = {
  id: "",
  title: "",
  authorName: "",
  authorAvatarUrl: "https://i.pravatar.cc/150",
  price: "",
  description: "",
  fileType: ".pdf",
  tags: [] as string[],
  previewImageUrl: "",
};

export default function ResourceSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });
  const [resource, setResource] = useState(EMPTY_RESOURCE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await resourceAPI.getSingleResource(id);
        if (res.success && res.data) {
          const data = res.data;
          setResource({
            id: data._id || data.id,
            title: data.name,
            authorName: data.owner?.name || "Author",
            authorAvatarUrl: data.owner?.avatar || "https://i.pravatar.cc/150",
            price: formatPrice(data.isFree, data.price, data.currency),
            description: data.description,
            fileType: data.resourceFile?.format ? `.${data.resourceFile.format}` : ".pdf",
            tags: data.tags || [],
            previewImageUrl: data.coverPhoto || "/assets/pdf1.png",
          });
        }
      } catch (err) {
        console.error("Failed to fetch purchased resource:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const handleOpenResource = () => {
    router.push(`/resources/${id}/view`);
  };

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      <header className={styles.backHeader}>
        <button onClick={() => router.push(`/resources/${id}`)} className={styles.backBtn} aria-label="Go back">
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
          Your <strong>resource</strong> is ready!
        </p>

        {isLoading ? (
          <div className={styles.resourceCardMock}>Loading...</div>
        ) : (
          <div className={styles.resourceCardMock}>
            <div className={styles.mockImageContainer}>
              {resource.previewImageUrl && (
                <div className={styles.mockImageWrapper}>
                  <Image
                    src={resource.previewImageUrl}
                    alt="Resource Preview"
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                  />
                </div>
              )}
            </div>

            <div className={styles.mockContent}>
              <div className={styles.resourceHeader}>
                <Image
                  src={resource.authorAvatarUrl}
                  alt={resource.authorName}
                  width={24}
                  height={24}
                  className={styles.authorAvatar}
                  unoptimized
                />
                <span className={styles.authorName}>{resource.authorName}</span>
              </div>
              <h3 className={styles.resourceTitle}>{resource.title}</h3>
              <div className={styles.resourcePrice}>{resource.price}</div>
              <p className={styles.resourceDesc}>{resource.description}</p>

              <div className={styles.resourceMeta}>
                <div className={styles.fileType}>
                  <DocumentIcon />
                  {resource.fileType}
                </div>
                <div className={styles.tags}>
                  {resource.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
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
