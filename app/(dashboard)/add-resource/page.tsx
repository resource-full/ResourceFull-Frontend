"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";
import { COUNTRIES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/lib/constants/onboarding";
import { resourceAPI } from "@/app/lib/api/resource";
import styles from "./page.module.css";

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#024A94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2110_10669)">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.96415 8.38229C4.85753 5.04813 8.28464 3.06949 11.6188 3.96287C12.7196 4.25784 13.6711 4.82799 14.421 5.57928L16.0069 7.16517H13.3538C13.0086 7.16517 12.7288 7.44499 12.7288 7.79017C12.7288 8.13535 13.0086 8.41517 13.3538 8.41517H17.5143C17.6801 8.41517 17.8391 8.34931 17.9563 8.23208C18.0735 8.11485 18.1393 7.95586 18.1393 7.79008V3.62967C18.1393 3.28449 17.8595 3.00467 17.5143 3.00467C17.1691 3.00467 16.8893 3.28449 16.8893 3.62967V6.27981L15.3057 4.69622C14.4048 3.79365 13.261 3.1088 11.9423 2.75546C7.94133 1.6834 3.8288 4.05777 2.75674 8.05877C2.6674 8.39218 2.86527 8.73489 3.19868 8.82423C3.5321 8.91357 3.87481 8.7157 3.96415 8.38229ZM16.8037 11.1756C16.4703 11.0862 16.1276 11.2841 16.0382 11.6175C15.1448 14.9517 11.7177 16.9303 8.38356 16.0369C7.28275 15.742 6.33126 15.1718 5.58138 14.4206L3.99647 12.8346H6.64882C6.99399 12.8346 7.27382 12.5548 7.27382 12.2096C7.27382 11.8644 6.99399 11.5846 6.64882 11.5846L2.48828 11.5846C2.1431 11.5846 1.86328 11.8644 1.86328 12.2096V16.3702C1.86328 16.7153 2.1431 16.9952 2.48828 16.9952C2.83346 16.9952 3.11328 16.7153 3.11328 16.3702V13.7192L4.69667 15.3036C5.59767 16.2063 6.74127 16.891 8.06004 17.2444C12.061 18.3164 16.1736 15.942 17.2456 11.941C17.335 11.6076 17.1371 11.2649 16.8037 11.1756Z" fill="#024385" />
    </g>
    <defs>
      <clipPath id="clip0_2110_10669">
        <rect width="20" height="20" rx="10" fill="white" />
      </clipPath>
    </defs>
  </svg>

);

export default function AddResourcePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [hubs, setHubs] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);

  // Dropdown States
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const HUB_OPTIONS = [
    { value: "create", label: "+ Create Hub", icon: "" },
    { value: "6a367c19f6d5e39da2a28636", label: "CV Templates" },
    { value: "6a367c19f6d5e39da2a28637", label: "JS Codes" }
  ];

  // Modal State
  const [modalType, setModalType] = useState<"success" | "error" | "draft" | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const submitResource = async (actionType: 'post' | 'save_draft') => {
    if (!uploadedFile || !name || !description) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('resourceFile', uploadedFile);
      if (coverPhotoFile) {
        formData.append('coverPhoto', coverPhotoFile);
      }
      
      const locationLabel = locations.length > 0 
        ? COUNTRIES.find(c => c.value === locations[0])?.label 
        : 'Worldwide';
        
      const experienceLabel = experiences.length > 0 
        ? EXPERIENCE_OPTIONS.find(e => e.value === experiences[0])?.label 
        : 'Professional (above 6 years)';
        
      const industryLabel = industries.length > 0 
        ? SKILLS_OPTIONS.find(s => s.value === industries[0])?.label 
        : 'Software Development';

      formData.append('applicableLocation', locationLabel || 'Worldwide');
      formData.append('experience', experienceLabel || 'Professional (above 6 years)');
      
      // The backend seems strictly configured for 'Software Development' instead of 'Web Development'
      formData.append('industry', 'Software Development');
      
      formData.append('isFree', isFree.toString());
      formData.append('price', price || '0');
      formData.append('currency', 'USD');
      
      // Temporary fix: Do not send hubId because the mock IDs won't exist for this user in the backend
      // if (hubs.length > 0 && hubs[0] !== "create") {
      //   formData.append('hubId', hubs[0]);
      // }
      
      formData.append('status', 'draft');

      const response = await resourceAPI.createResource(formData);

      if (response && response.success === false) {
        throw new Error((response as any).message || "Upload failed");
      }

      if (actionType === 'save_draft') {
        setModalType("draft");
      } else {
        setModalType("success");
      }
    } catch (error: any) {
      console.error('Failed to upload resource:', error?.response?.data || error);
      setModalType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = () => {
    submitResource('post');
  };

  const handleSaveDraft = () => {
    submitResource('save_draft');
  };

  const closeModal = () => {
    setModalType(null);
    if (modalType === "success") {
      // Reset form
      setUploadedFile(null);
      setCoverPhoto(null);
      setCoverPhotoFile(null);
      setName("");
      setDescription("");
      setLocations([]);
      setExperiences([]);
      setIndustries([]);
      setHubs([]);
      setPrice("");
      setIsFree(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add Resource</h1>
        {uploadedFile && (
          <div className={styles.headerActions}>
            <button className={styles.btnDraft} onClick={handleSaveDraft} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Draft'}
            </button>
            <button className={`${styles.btnPost} ${(!name || isLoading) ? styles.btnPostDisabled : ''}`} onClick={handlePost} disabled={isLoading || !name}>
              <span style={{ transform: 'rotate(-45deg)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </span>
              {isLoading ? 'Posting...' : 'Post'}
            </button>
          </div>
        )}
      </div>

      {!uploadedFile ? (
        <div className={styles.uploadZone}>
          <label className={styles.uploadDashed}>
            <span className={styles.uploadIcon}><UploadIcon /></span>
            <span className={styles.uploadTitle}>Drop file here or select from computer</span>
            <span className={styles.uploadSubtitle}>Supported formats: pdf, mp3, mp4, jpg, png.</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.mp3,.mp4,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      ) : (
        <div className={styles.formLayout}>
          <div className={styles.leftCol}>
            <div className={styles.fileCard}>
              <div className={styles.fileInfo}>
                <FileIcon />
                {uploadedFile.name}
              </div>
              <button className={styles.replaceBtn} onClick={() => setUploadedFile(null)}>
                <RefreshIcon />
              </button>
            </div>

            <label className={styles.coverUpload} style={{ border: coverPhoto ? 'none' : '2px dashed #cbd5e1', overflow: 'hidden', padding: coverPhoto ? 0 : '16px' }}>
              {coverPhoto ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image src={coverPhoto} alt="Cover Preview" fill style={{ objectFit: 'cover' }} unoptimized />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 150ms ease' }} className="hover:opacity-100">
                    <span className={styles.coverIcon} style={{ color: '#fff' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </span>
                    <span className={styles.coverTitle} style={{ color: '#fff' }}>Change Photo</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className={styles.coverIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </span>
                  <span className={styles.coverTitle}>Upload Cover photo</span>
                  <span className={styles.coverSubtitle}>We recommend using high quality images between 1080px by 1080px</span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setCoverPhotoFile(file);
                    const reader = new FileReader();
                    reader.onload = (e) => setCoverPhoto(e.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.inputGroup}>
              <span className={styles.label}>Resource Name</span>
              <input
                type="text"
                className={styles.input}
                placeholder="Placeholder"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <span className={styles.label}>Description</span>
              <textarea
                className={styles.textarea}
                placeholder="Placeholder"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <FormMultiSelect
              label="Applicable Location"
              options={COUNTRIES.filter(c => c.value !== 'worldwide')}
              selected={locations}
              onChange={setLocations}
              isOpen={openDropdown === 'location'}
              onToggle={() => toggleDropdown('location')}
              enableSearch
            />

            <FormMultiSelect
              label="Experience"
              options={EXPERIENCE_OPTIONS}
              selected={experiences}
              onChange={setExperiences}
              isOpen={openDropdown === 'experience'}
              onToggle={() => toggleDropdown('experience')}
            />

            <FormMultiSelect
              label="Industry"
              options={SKILLS_OPTIONS}
              selected={industries}
              onChange={setIndustries}
              isOpen={openDropdown === 'industry'}
              onToggle={() => toggleDropdown('industry')}
              enableSearch
            />

            <div className={styles.inputGroup}>
              <span className={styles.label}>Price</span>
              <input
                type="text"
                className={styles.input}
                placeholder="$100"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={isFree}
                style={{ opacity: isFree ? 0.5 : 1 }}
              />
            </div>

            <label className={styles.checkboxGroup}>
              <div className={`${styles.checkbox} ${isFree ? styles.checkboxActive : ''}`}>
                {isFree && <span style={{ color: '#fff' }}><CheckIcon /></span>}
              </div>
              <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#11243d' }}>Free</span>
              <input
                type="checkbox"
                className="hidden"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
              />
            </label>

            <FormMultiSelect
              label="Add to Hub"
              options={HUB_OPTIONS}
              selected={hubs}
              onChange={setHubs}
              isOpen={openDropdown === 'hub'}
              onToggle={() => toggleDropdown('hub')}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      {modalType && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {modalType === "success" && (
              <>
                <div className={styles.modalIcon}>
                  <CheckIcon />
                </div>
                <h3 className={styles.modalTitle}>Resource Uploaded!</h3>
                <p className={styles.modalSubtitle}>
                  Your resource is live
                  {hubs.length > 0 && hubs[0] !== 'create' ? (
                    <> and has been added to <strong>{HUB_OPTIONS.find(h => h.value === hubs[0])?.label}</strong></>
                  ) : null}
                </p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={() => window.location.href = '#'}>Go to Profile</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={closeModal}>Upload More</button>
                </div>
              </>
            )}
            {modalType === "error" && (
              <>
                <div className={`${styles.modalIcon} ${styles.modalIconError}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className={styles.modalTitle}>Resource Upload Failed.</h3>
                <p className={styles.modalSubtitle}>Whoops! There seems to be an issue. Please try again.</p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={handleSaveDraft}>Save Draft</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={() => setModalType(null)}>Try Again</button>
                </div>
              </>
            )}
            {modalType === "draft" && (
              <>
                <div className={styles.modalIcon}>
                  <CheckIcon />
                </div>
                <h3 className={styles.modalTitle}>Saved to Drafts</h3>
                <p className={styles.modalSubtitle}>Your resource is now saved in your drafts</p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={() => window.location.href = '#'}>Go to Profile</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={closeModal}>Upload More</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
