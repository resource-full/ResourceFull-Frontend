"use client";

import { useState } from "react";
import styles from "./ProfileModals.module.css";

interface LinkedInModalProps {
  onClose: () => void;
  onConnect: (url: string) => void;
}

export default function LinkedInModal({ onClose, onConnect }: LinkedInModalProps) {
  const [url, setUrl] = useState("");

  const handleConnect = () => {
    if (!url.trim()) return;
    onConnect(url.trim());
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <div className={styles.avatarsRow}>
            <div className={styles.avatarCircle} />
            <div className={styles.avatarCircleAlt} />
          </div>
          <div className={styles.textGroup}>
            <h3 className={styles.modalTitle}>Connect your Linkedin</h3>
            <p className={styles.modalSubtitle}>
              Paste your Linkedin url to connect your experience to your resources and increase your confidence score!
            </p>
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel} htmlFor="linkedin-url">Linkedin URL</label>
          <input
            id="linkedin-url"
            type="text"
            className={styles.inputField}
            placeholder="Placeholder"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className={styles.modalActions}>
          <button className={styles.btnSecondary} onClick={onClose}>Cancel</button>
          <button className={styles.btnPrimary} onClick={handleConnect} disabled={!url.trim()}>Connect</button>
        </div>
      </div>
    </div>
  );
}
