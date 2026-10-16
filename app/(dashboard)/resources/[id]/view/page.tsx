"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { resourceAPI } from "@/app/lib/api/resource";
import { Resource } from "@/app/lib/types/resource";
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

const DocumentIcon = () => (
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.genericFileIcon}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IMAGE_FORMATS = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
const VIDEO_FORMATS = ["mp4", "mov", "webm", "mkv"];
const AUDIO_FORMATS = ["mp3", "wav", "ogg", "m4a"];

export default function ResourceViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resource, setResource] = useState<Resource | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await resourceAPI.downloadResource(id);
        if (cancelled) return;
        if (res.success && res.data) {
          setResource(res.data.resource);
          setFileUrl(res.data.downloadUrl || res.data.resource?.resourceFile?.url || null);
        } else {
          setError("You don't have access to this resource.");
        }
      } catch (err) {
        console.error("Failed to load resource for viewing:", err);
        if (!cancelled) setError("You don't have access to this resource, or it could not be loaded.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [id]);

  const mainColor = "#58169c";
  const format = resource?.resourceFile?.format?.toLowerCase() || "";
  const isPdf = format === "pdf";
  const isImage = IMAGE_FORMATS.includes(format);
  const isVideo = VIDEO_FORMATS.includes(format);
  const isAudio = AUDIO_FORMATS.includes(format);

  return (
    <div className={styles.viewerContainer}>
      <header className={styles.viewerHeader} style={{ backgroundColor: mainColor }}>
        <button onClick={() => router.back()} className={styles.closeBtn} aria-label="Close viewer">
          <CloseIcon />
        </button>
        <div className={styles.resourceTitle}>{resource?.name || "Resource"}</div>
        {resource?.owner && (
          <div className={styles.authorInfo}>
            <Image
              src={resource.owner.avatar || "https://i.pravatar.cc/150"}
              alt={resource.owner.name || "Author"}
              width={28}
              height={28}
              className={styles.authorAvatar}
              unoptimized
            />
            <span>{resource.owner.name}</span>
          </div>
        )}
      </header>

      <div className={styles.contentArea}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <span>Loading resource...</span>
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <span>{error}</span>
            <button className={styles.downloadBtn} onClick={() => router.push(`/resources/${id}`)}>
              Back to Resource
            </button>
          </div>
        ) : !fileUrl ? (
          <div className={styles.errorContainer}>This resource has no viewable file.</div>
        ) : isPdf ? (
          <div className={styles.pdfPreview}>
            <iframe src={fileUrl} className={styles.pdfFrame} title={resource?.name || "Document"} />
          </div>
        ) : isImage ? (
          <div className={styles.pdfPreview}>
            <img src={fileUrl} alt={resource?.name || "Preview"} className={styles.pdfPage} />
          </div>
        ) : isVideo ? (
          <div className={styles.videoContainer}>
            <div className={styles.videoPlayerWrapper}>
              <video src={fileUrl} controls className={styles.videoPlayer} />
            </div>
          </div>
        ) : isAudio ? (
          <div className={styles.audioContainer}>
            <AudioIcon />
            <div className={styles.audioControls}>
              <div className={styles.audioTitle}>{resource?.name}</div>
              <audio src={fileUrl} controls className={styles.audioPlayer} />
            </div>
          </div>
        ) : (
          <div className={styles.genericFile}>
            <DocumentIcon />
            <p>Preview isn&apos;t available for .{format || "this"} files.</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
