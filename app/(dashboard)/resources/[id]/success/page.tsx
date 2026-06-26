"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardHeader from "../../../_components/DashboardHeader";
import styles from "./page.module.css";
import { useState, use } from "react";
import { DashboardFilters } from "../../../_components/DashboardHeader";

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

// We mock the resource data, similar to the main page
const MOCK_RESOURCE = {
  id: "1",
  title: "Graphic Designer 80% wining rate CV",
  authorName: "Stella Della",
  authorAvatarUrl: "https://i.pravatar.cc/150?u=stella",
  price: "$120",
  description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume. Perfect for both beginners and experienced designers, this guide ensures your CV highlights your skills and experience, making a strong impact on potential employers.",
  fileType: ".pdf",
  tags: ["Design", "CV"],
  previewImageUrl: "/assets/pdf.jpg",
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

        <div className={styles.resourceCardMock}>
          <div className={styles.mockImageContainer}>
            {MOCK_RESOURCE.previewImageUrl && (
              <div className={styles.mockImageWrapper}>
                <Image 
                  src={MOCK_RESOURCE.previewImageUrl} 
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
                src={MOCK_RESOURCE.authorAvatarUrl} 
                alt={MOCK_RESOURCE.authorName} 
                width={24} 
                height={24} 
                className={styles.authorAvatar}
                unoptimized 
              />
              <span className={styles.authorName}>{MOCK_RESOURCE.authorName}</span>
            </div>
            <h3 className={styles.resourceTitle}>{MOCK_RESOURCE.title}</h3>
            <div className={styles.resourcePrice}>{MOCK_RESOURCE.price}</div>
            <p className={styles.resourceDesc}>{MOCK_RESOURCE.description}</p>
            
            <div className={styles.resourceMeta}>
              <div className={styles.fileType}>
                <DocumentIcon />
                {MOCK_RESOURCE.fileType}
              </div>
              <div className={styles.tags}>
                {MOCK_RESOURCE.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

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
