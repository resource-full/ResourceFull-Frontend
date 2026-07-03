"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";
import { COUNTRIES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/lib/constants/onboarding";
import styles from "./page.module.css";

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.25 21.375V17.4375C29.25 14.6416 26.9834 12.375 24.1875 12.375H21.9375C21.0055 12.375 20.25 11.6195 20.25 10.6875V8.4375C20.25 5.64156 17.9834 3.375 15.1875 3.375H12.375M22.5 21.375L18 25.875L13.5 21.375M18 25.875L18 16.875M15.75 3.375H8.4375C7.50552 3.375 6.75 4.13052 6.75 5.0625V30.9375C6.75 31.8695 7.50552 32.625 8.4375 32.625H27.5625C28.4945 32.625 29.25 31.8695 29.25 30.9375V16.875C29.25 9.41916 23.2058 3.375 15.75 3.375Z" stroke="#024385" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function EditResourcePage() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | { name: string }>({ name: "Cv Template.pdf" });
  const [coverPhoto, setCoverPhoto] = useState<string | null>("/assets/plain-pdf.png");

  // Pre-filled Form State
  const [name, setName] = useState("My Resource");
  const [description, setDescription] = useState("Lorem Ipsum");
  const [locations, setLocations] = useState<string[]>(["angola"]);
  const [experiences, setExperiences] = useState<string[]>(["undergraduate"]);
  const [industries, setIndustries] = useState<string[]>(["law"]);
  const [hubs, setHubs] = useState<string[]>(["cv"]);
  const [price, setPrice] = useState("$100");
  const [isFree, setIsFree] = useState(true);

  // Checkboxes state
  const [isCvTemplates, setIsCvTemplates] = useState(true);
  const [isJsCodes, setIsJsCodes] = useState(false);
  const [exp1, setExp1] = useState(false);
  const [exp2, setExp2] = useState(false);

  // Collapse sections
  const [isHubOpen, setIsHubOpen] = useState(true);
  const [isExpOpen, setIsExpOpen] = useState(true);

  // Dropdown States
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Modal State
  const [modalType, setModalType] = useState<"success" | "error" | "draft" | "onlyme" | "back" | null>(null);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleUpdate = () => {
    // Simulate API call
    if (name && description) {
      setModalType("success");
    } else {
      setModalType("error");
    }
  };

  const handleBackClick = () => {
    setModalType("back");
  };

  const handleConfirmBack = () => {
    router.push("/profile");
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.backTitle} onClick={handleBackClick}>
          <ArrowLeftIcon />
          <h1 className={styles.title}>Edit Resource</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.linkOnlyMe} onClick={() => setModalType("draft")}>Save Draft</button>
          <button className={styles.btnDraft} onClick={() => setModalType("onlyme")}>Mark as Only Me</button>
          <button className={`${styles.btnPost} ${!name ? styles.btnPostDisabled : ''}`} onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>

      <div className={styles.formLayout}>
        <div className={styles.leftCol}>
          <div className={styles.fileCard}>
            <div className={styles.fileInfo}>
              <FileIcon />
              {uploadedFile.name}
            </div>
            <button className={styles.replaceBtn} onClick={() => setUploadedFile({ name: "Cv Template.pdf" })}>
              <RefreshIcon />
            </button>
          </div>

          <label className={styles.coverUpload} style={{ border: coverPhoto ? 'none' : '2px dashed #cbd5e1', overflow: 'hidden', padding: coverPhoto ? 0 : '16px' }}>
            {coverPhoto ? (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '10px', padding: '10px', paddingTop: '20px', paddingLeft: '20px', }}>
                  <span className={styles.coverIcon} style={{ color: '#fff' }}>
                    <RefreshIcon />
                  </span>
                  <span className={styles.coverTitle} style={{}}>Change cover photo</span>
                </div>
                <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden', }}>
                  <Image src={coverPhoto} alt="Cover Preview" fill style={{ objectFit: 'cover', paddingTop: '0', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px' }} unoptimized />
                </div>
              </div>
            ) : (
              <>
                <span className={styles.coverIcon}>
                  <RefreshIcon />
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
                  const reader = new FileReader();
                  reader.onload = (e) => setCoverPhoto(e.target?.result as string);
                  reader.readAsDataURL(e.target.files[0]);
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

          <label className={styles.checkboxGroup} style={{ marginBottom: '8px' }}>
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

          {/* Add to Hub Collapsible */}
          <div className={styles.collapseSection}>
            <button className={styles.collapseBtn} onClick={() => setIsHubOpen(!isHubOpen)}>
              <span>Add to Hub</span>
              {isHubOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isHubOpen && (
              <div className={styles.collapseContent}>
                <button className={styles.createLink}>+ Create Hub</button>
                <label className={styles.checkboxGroup}>
                  <div className={`${styles.checkbox} ${isCvTemplates ? styles.checkboxActive : ''}`}>
                    {isCvTemplates && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                  </div>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 400, color: '#11243d' }}>CV Templates</span>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isCvTemplates}
                    onChange={(e) => setIsCvTemplates(e.target.checked)}
                  />
                </label>
                <label className={styles.checkboxGroup}>
                  <div className={`${styles.checkbox} ${isJsCodes ? styles.checkboxActive : ''}`}>
                    {isJsCodes && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                  </div>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 400, color: '#11243d' }}>JS Codes</span>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isJsCodes}
                    onChange={(e) => setIsJsCodes(e.target.checked)}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Link Experience Collapsible */}
          <div className={styles.collapseSection}>
            <button className={styles.collapseBtn} onClick={() => setIsExpOpen(!isExpOpen)}>
              <span>Link Experience</span>
              {isExpOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isExpOpen && (
              <div className={styles.collapseContent}>
                <label className={styles.checkboxGroup}>
                  <div className={`${styles.checkbox} ${exp1 ? styles.checkboxActive : ''}`}>
                    {exp1 && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                  </div>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 400, color: '#11243d' }}>Senior Product Manager, Google, 2012 - 2026</span>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={exp1}
                    onChange={(e) => setExp1(e.target.checked)}
                  />
                </label>
                <label className={styles.checkboxGroup}>
                  <div className={`${styles.checkbox} ${exp2 ? styles.checkboxActive : ''}`}>
                    {exp2 && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                  </div>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 400, color: '#11243d' }}>Senior Product Manager, Google, 2012 - 2026</span>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={exp2}
                    onChange={(e) => setExp2(e.target.checked)}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalType && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {modalType === "success" && (
              <>
                <div className={styles.modalIcon}>
                  <CheckIcon />
                </div>
                <h3 className={styles.modalTitle}>Resource Updated!</h3>
                <p className={styles.modalSubtitle}>Your changes have been saved successfully.</p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={() => router.push('/profile')}>Go to Profile</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={closeModal}>Continue Editing</button>
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
                <h3 className={styles.modalTitle}>Resource Update Failed.</h3>
                <p className={styles.modalSubtitle}>Whoops! There seems to be an issue. Please try again.</p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={() => setModalType("draft")}>Save Draft</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={handleUpdate}>Try Again</button>
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
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={() => router.push('/profile')}>Go to Profile</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={closeModal}>Continue Editing</button>
                </div>
              </>
            )}

            {modalType === "onlyme" && (
              <>
                <div className={`${styles.modalIcon} ${styles.modalIconWarning}`}>
                  <WarningIcon />
                </div>
                <h3 className={styles.modalTitle}>Are you sure?</h3>
                <p className={styles.modalSubtitle}>Marking this item as Only Me will remove it from the public feed, and associated hubs and pathways!</p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={closeModal}>Cancel</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={() => {
                    closeModal();
                    // Implement Mark as Only Me logic here
                  }}>Proceed</button>
                </div>
              </>
            )}

            {modalType === "back" && (
              <>
                <div className={`${styles.modalIcon} ${styles.modalIconWarning}`}>
                  <WarningIcon />
                </div>
                <h3 className={styles.modalTitle}>Are you sure?</h3>
                <p className={styles.modalSubtitle}>Your progress will be lost.</p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={closeModal}>Cancel</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={handleConfirmBack}>Proceed</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
