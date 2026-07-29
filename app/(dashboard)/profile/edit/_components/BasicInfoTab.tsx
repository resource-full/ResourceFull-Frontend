import React, { useRef } from "react";
import Image from "next/image";
import Select from "@/app/components/ui/Select";
import styles from "./Tab.module.css";

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#024A94" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const UserSilhouetteIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a0a9b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" fill="none" />
  </svg>
);

interface BasicInfoTabProps {
  coverPhoto: string | null;
  avatar: string | null;
  firstName: string;
  lastName: string;
  username: string;
  location: string;
  onCoverChange: (base64: string | null) => void;
  onAvatarChange: (base64: string | null) => void;
  onChange: (field: string, value: string) => void;
}

const LOCATION_OPTIONS = [
  { value: "Nigeria", label: "Nigeria" },
  { value: "Kenya", label: "Kenya" },
  { value: "South Africa", label: "South Africa" },
  { value: "Ghana", label: "Ghana" },
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Worldwide", label: "Worldwide" },
];

export default function BasicInfoTab({
  coverPhoto,
  avatar,
  firstName,
  lastName,
  username,
  location,
  onCoverChange,
  onAvatarChange,
  onChange,
}: BasicInfoTabProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await convertToBase64(file);
        setter(base64);
      } catch (err) {
        console.error("Error converting photo:", err);
      }
    }
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitle}>Basic Info</h2>
        <p className={styles.tabSubtitle}>Your name, photo, and location</p>
      </div>

      <div className={styles.formSection}>
        {/* Cover Photo */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Upload cover photo</label>
          <div
            className={styles.coverDropzone}
            onClick={() => coverInputRef.current?.click()}
          >
            {coverPhoto && !coverPhoto.startsWith("linear-gradient") ? (
              <>
                <Image
                  src={coverPhoto}
                  alt="Cover"
                  fill
                  className={styles.coverImage}
                  unoptimized
                />
                <div
                  className={styles.removeMediaOverlay}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCoverChange(null);
                  }}
                >
                  <span className={styles.removeText}>Remove</span>
                </div>
              </>
            ) : coverPhoto && coverPhoto.startsWith("linear-gradient") ? (
              <>
                 <div style={{ background: coverPhoto, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '12px' }} />
                 <div
                  className={styles.removeMediaOverlay}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCoverChange(null);
                  }}
                >
                  <span className={styles.removeText}>Remove</span>
                </div>
              </>
            ) : (
              <div className={styles.coverPlaceholder}>
                <PlusIcon />
                <span className={styles.uploadMainText}>Upload Cover Photo</span>
                <span className={styles.uploadSubText}>Supported formats pdf, mp3, mp4, jpg, png.</span>
              </div>
            )}
            <input
              type="file"
              ref={coverInputRef}
              onChange={(e) => handleFileChange(e, onCoverChange)}
              accept="image/*"
              className={styles.hiddenInput}
            />
          </div>
        </div>

        {/* Avatar */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Upload new photo</label>
          <div className={styles.avatarWrapper} onClick={() => avatarInputRef.current?.click()}>
            {avatar ? (
              <Image
                src={avatar}
                alt="Avatar"
                width={80}
                height={80}
                className={styles.avatarImage}
                unoptimized
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <UserSilhouetteIcon />
              </div>
            )}
            <div className={styles.cameraIconWrapper}>
              <CameraIcon />
            </div>
            <input
              type="file"
              ref={avatarInputRef}
              onChange={(e) => handleFileChange(e, onAvatarChange)}
              accept="image/*"
              className={styles.hiddenInput}
            />
          </div>
        </div>

        {/* Identity Grid */}
        <div className={styles.identitySection}>
          <h3 className={styles.sectionSubtitle}>Identity</h3>
          <div className={styles.grid2Col}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>First Name</label>
              <input
                type="text"
                className={styles.textInput}
                value={firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Last Name</label>
              <input
                type="text"
                className={styles.textInput}
                value={lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Handle</label>
              <div className={styles.inputWithPrefix}>
                <span className={styles.inputPrefix}>rf.co/</span>
                <input
                  type="text"
                  className={styles.textInputNoBorder}
                  value={username}
                  onChange={(e) => onChange("username", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.fieldGroup} style={{ position: 'relative' }}>
              <label className={styles.fieldLabel}>Location</label>
              <Select
                id="location-select"
                options={LOCATION_OPTIONS}
                value={location}
                onChange={(val) => onChange("location", val)}
                placeholder="Select Location"
                isTransparent={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
