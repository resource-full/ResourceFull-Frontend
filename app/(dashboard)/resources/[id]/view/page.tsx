"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { use } from "react";
import styles from "./page.module.css";

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AudioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.audioIcon}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

// We mock fetching the resource based on the ID. In a real scenario, this would come from an API.
const MOCK_RESOURCE = {
  id: "1",
  title: "Graphic Designer 80% wining rate CV",
  authorName: "Stella Della",
  authorAvatarUrl: "https://i.pravatar.cc/150?u=stella",
  variant: "purple" as "purple" | "orange",
  // fileType: ".pdf", // Change to ".mp4" or ".mp3" to test different views
  fileType: ".pdf",
  contentUrl: "/assets/pdf.jpg",
  videoUrl: "/assets/Video1.png",
  audioUrl: "/assets/audio.png",
  audioTitle: "Cold Little Heart"
};

export default function ResourceViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  // We can switch this to see different views based on fileType
  const fileType = MOCK_RESOURCE.fileType;
  const mainColor = MOCK_RESOURCE.variant === "purple" ? "#58169c" : "#ad3307";

  return (
    <div className={styles.viewerContainer}>
      <header className={styles.viewerHeader} style={{ backgroundColor: mainColor }}>
        <button onClick={() => router.back()} className={styles.closeBtn} aria-label="Close viewer">
          <CloseIcon />
        </button>
        <div className={styles.resourceTitle}>{MOCK_RESOURCE.title}</div>
        <div className={styles.authorInfo}>
          <Image
            src={MOCK_RESOURCE.authorAvatarUrl}
            alt={MOCK_RESOURCE.authorName}
            width={28}
            height={28}
            className={styles.authorAvatar}
            unoptimized
          />
          <span>{MOCK_RESOURCE.authorName}</span>
        </div>
      </header>

      <div className={styles.contentArea}>
        {fileType === ".pdf" && (
          <div className={styles.pdfPreview}>
            <img src={MOCK_RESOURCE.contentUrl} alt="PDF Document" className={styles.pdfPage} />
          </div>
        )}

        {fileType === ".mp4" && (
          <div className={styles.videoContainer}>
            <div className={styles.videoPlayerWrapper}>
              <video src={MOCK_RESOURCE.videoUrl} controls className={styles.videoPlayer} />
            </div>
          </div>
        )}

        {fileType === ".mp3" && (
          <div className={styles.audioContainer}>
            <AudioIcon />
            <div className={styles.audioControls}>
              <div className={styles.audioTitle}>{MOCK_RESOURCE.audioTitle}</div>
              <audio src={MOCK_RESOURCE.audioUrl} controls className={styles.audioPlayer} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
