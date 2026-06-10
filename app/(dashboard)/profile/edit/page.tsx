"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";
import { SuccessModal, ErrorModal } from "@/app/components/ui";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.28033 7.71967C7.57322 8.01256 7.57322 8.48744 7.28033 8.78033L4.81066 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H4.81066L7.28033 15.2197C7.57322 15.5126 7.57322 15.9874 7.28033 16.2803C6.98744 16.5732 6.51256 16.5732 6.21967 16.2803L2.46967 12.5303C2.17678 12.2374 2.17678 11.7626 2.46967 11.4697L6.21967 7.71967C6.51256 7.42678 6.98744 7.42678 7.28033 7.71967Z" fill="#0F0F0F" />
  </svg>
);

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" fill="none" />
  </svg>
);

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

const INDUSTRY_OPTIONS = [
  { value: "law", label: "Law" },
  { value: "tech", label: "Technology" },
  { value: "health", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "edu", label: "Education" },
  { value: "design", label: "Design" },
];

export default function EditProfilePage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("Stella Della");
  const [username, setUsername] = useState("@adaeze.builds");
  const [profession, setProfession] = useState("Frontend Development");
  const [shortDesc, setShortDesc] = useState(
    "Senior PM at Google Lagos · Building career resources for ambitious Africans. Previously Paystack, Andela."
  );
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(["law"]);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  // Image states
  const [avatar, setAvatar] = useState<string | null>(
    "/assets/9fa8a96b7774ec94ca80cf93ebd4ece37578f603.jpg"
  );
  const [coverPhoto, setCoverPhoto] = useState<string | null>(
    "linear-gradient(90deg, #d4a72d 0%, #a6d88c 100%)"
  );

  // Modal / save states
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resourcefull_profile_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line
        if (parsed.name) setName(parsed.name);
        // eslint-disable-next-line
        if (parsed.username) setUsername(parsed.username);
        // eslint-disable-next-line
        if (parsed.profession) setProfession(parsed.profession);
        // eslint-disable-next-line
        if (parsed.shortDesc) setShortDesc(parsed.shortDesc);
        // eslint-disable-next-line
        if (parsed.industries) setSelectedIndustries(parsed.industries);
        // eslint-disable-next-line
        if (parsed.avatar) setAvatar(parsed.avatar);
        // eslint-disable-next-line
        if (parsed.coverPhoto) setCoverPhoto(parsed.coverPhoto);
      } catch (e) {
        console.error("Error reading profile data from localStorage:", e);
      }
    }
  }, []);

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleCoverClick = () => {
    coverInputRef.current?.click();
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await convertToBase64(file);
        setAvatar(base64);
      } catch (err) {
        console.error("Error converting avatar to base64:", err);
      }
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await convertToBase64(file);
        setCoverPhoto(base64);
      } catch (err) {
        console.error("Error converting cover photo to base64:", err);
      }
    }
  };

  const handleDone = () => {
    setIsSaving(true);

    const profileData = {
      name,
      username,
      profession,
      shortDesc,
      industries: selectedIndustries,
      avatar,
      coverPhoto
    };

    // Simulate API request
    setTimeout(() => {
      setIsSaving(false);
      // To test error modal: if Name contains "fail" or "error", show error modal.
      if (name.toLowerCase().includes("fail") || name.toLowerCase().includes("error")) {
        setShowError(true);
      } else {
        localStorage.setItem("resourcefull_profile_data", JSON.stringify(profileData));
        setShowSuccess(true);
      }
    }, 1000);
  };

  const handleSaveDraft = () => {
    const profileData = {
      name,
      username,
      profession,
      shortDesc,
      industries: selectedIndustries,
      avatar,
      coverPhoto
    };
    localStorage.setItem("resourcefull_profile_data", JSON.stringify(profileData));
    alert("Draft saved successfully!");
  };

  const removeAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatar(null);
  };

  const removeCover = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCoverPhoto(null);
  };

  return (
    <div className={styles.editPageContainer}>

      {/* Header bar */}
      <div className={styles.headerBar}>
        <div className={styles.backButtonArea}>
          <Link href="/profile" className={styles.backLink}>
            <BackIcon />
            <span className={styles.headerTitle}>Edit Profile</span>
          </Link>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSaveDraft}
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            Save Draft
          </button>
          <button
            type="button"
            className={styles.btnDone}
            onClick={handleDone}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Done"}
          </button>
        </div>
      </div>

      {/* Main Form Area */}
      <div className={styles.formCard}>

        {/* Avatar and Cover container */}
        <div className={styles.mediaContainer}>

          {/* Cover Photo */}
          <div
            className={styles.coverWrapper}
            style={{
              background: coverPhoto && coverPhoto.startsWith("linear-gradient") ? coverPhoto : undefined
            }}
            onClick={handleCoverClick}
          >
            {coverPhoto && !coverPhoto.startsWith("linear-gradient") ? (
              <>
                <Image
                  src={coverPhoto!}
                  alt="Cover Preview"
                  fill
                  className={styles.coverImage}
                  unoptimized
                />
                <button type="button" className={styles.removeMediaBtn} onClick={removeCover}>
                  Remove
                </button>
              </>
            ) : (
              <div className={styles.coverPlaceholder}>
                <div className={styles.plusCircle}>
                  <PlusIcon />
                </div>
                <span className={styles.uploadText}>Upload Cover Photo</span>
                <span className={styles.supportText}>Supported formats pdf, mp3, mp4, jpg, png.</span>
              </div>
            )}
            <input
              type="file"
              ref={coverInputRef}
              onChange={handleCoverChange}
              accept="image/*"
              className={styles.hiddenInput}
            />
          </div>

          {/* Avatar Photo overlapping */}
          <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
            {avatar ? (
              <Image
                src={avatar!}
                alt="Avatar Preview"
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
            {avatar && (
              <button
                type="button"
                className={styles.avatarRemoveBtn}
                onClick={removeAvatar}
                title="Remove Avatar"
              >
                ×
              </button>
            )}
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className={styles.hiddenInput}
            />
          </div>

        </div>

        {/* Input Fields */}
        <div className={styles.inputFieldsList}>

          {/* Name Field */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Name</label>
            <input
              type="text"
              className={styles.textInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Placeholder"
            />
          </div>

          {/* Username Field */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Username</label>
            <input
              type="text"
              className={styles.textInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Placeholder"
            />
          </div>

          {/* Profession Field */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Profession</label>
            <input
              type="text"
              className={styles.textInput}
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Placeholder"
            />
          </div>

          {/* Short Description Field */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Short Description</label>
            <input
              className={styles.textareaInput}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Placeholder"
            />
          </div>

          {/* Industry Field */}
          <div className={styles.fieldGroup} style={{ paddingRight: '16px', paddingBottom: '16px', overflow: 'visible' }}>
            <label className={styles.fieldLabel}>Industry</label>
            <FormMultiSelect
              label="Select Industry"
              options={INDUSTRY_OPTIONS}
              selected={selectedIndustries}
              onChange={setSelectedIndustries}
              isOpen={isIndustryOpen}
              onToggle={() => setIsIndustryOpen(!isIndustryOpen)}
              isTransparent={true}
            />
          </div>

        </div>

      </div>

      {/* Info Tip to helper error test */}
      <div className={styles.testTip}>
        💡 <strong>Testing Tip:</strong> Enter <strong>&quot;fail&quot;</strong> or <strong>&quot;error&quot;</strong> in the Name field to test the failure modal. Otherwise, it will succeed.
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          title="Done!"
          subtitle="Your profile has been updated successfully"
          buttonText="See Profile"
          redirectTo="/profile"
          onClose={() => setShowSuccess(false)}
        />
      )}

      {/* Error Modal */}
      {showError && (
        <ErrorModal
          title="Profile Edit Failed"
          subtitle="Whoops! There seems to be an issue. Please try again."
          primaryButtonText="Try again"
          secondaryButtonText="Go to profile"
          onPrimary={() => {
            setShowError(false);
            handleDone();
          }}
          onSecondary={() => {
            setShowError(false);
            router.push("/profile");
          }}
          onClose={() => setShowError(false)}
        />
      )}

    </div>
  );
}
