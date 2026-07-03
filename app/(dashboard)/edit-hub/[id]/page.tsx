"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";
import { COUNTRIES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/lib/constants/onboarding";
import styles from "./page.module.css";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// Dummy resource card for selected lists
const DummyResourceCard = ({ title, variant = "purple" }: { title: string, variant?: "purple" | "orange" }) => {
  const bg = variant === "purple" ? "#6a359c" : "#c4452a";
  return (
    <div style={{ background: bg, color: '#fff', borderRadius: '12px', padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        <span style={{ fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>Design</span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>CV</span>
        </div>
        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>.pdf</span>
      </div>
    </div>
  );
};

// Dummy pathway card for selected lists
const DummyPathwayCard = ({ title, variant = "purple" }: { title: string, variant?: "purple" | "orange" }) => {
  const color = variant === "purple" ? "#6a359c" : "#c4452a";
  return (
    <div style={{ background: '#fff', border: `1px solid #e2e8f0`, borderRadius: '12px', padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ background: color, color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>Design</span>
          <span style={{ background: color, color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>CV</span>
        </div>
      </div>
      <div style={{ fontSize: '0.75rem', color: '#8c95a6', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        20 Resources
      </div>
    </div>
  );
};

export default function EditHubPage() {
  const router = useRouter();

  // Form State — Pre-filled
  const [name, setName] = useState("CV Templates Hub");
  const [description, setDescription] = useState("A curated collection of high-quality CV templates for various industries and experience levels.");
  const [locations, setLocations] = useState<string[]>(["angola"]);
  const [experiences, setExperiences] = useState<string[]>(["undergraduate"]);
  const [industries, setIndustries] = useState<string[]>(["law"]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Selected Items State — Pre-filled
  const [selectedResources, setSelectedResources] = useState<number[]>([1, 2, 3]);
  const [selectedPathways, setSelectedPathways] = useState<number[]>([1, 2]);

  // Modal State
  const [modalType, setModalType] = useState<"success" | "error" | "draft" | "onlyme" | "back" | null>(null);
  const [selectModal, setSelectModal] = useState<"resource" | "pathway" | null>(null);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleUpdate = () => {
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

  const toggleResource = (id: number) => {
    if (selectedResources.includes(id)) {
      setSelectedResources(selectedResources.filter(r => r !== id));
    } else {
      setSelectedResources([...selectedResources, id]);
    }
  };

  const togglePathway = (id: number) => {
    if (selectedPathways.includes(id)) {
      setSelectedPathways(selectedPathways.filter(p => p !== id));
    } else {
      setSelectedPathways([...selectedPathways, id]);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.backTitle} onClick={handleBackClick}>
          <ArrowLeftIcon />
          <h1 className={styles.title}>Edit Hub</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.linkOnlyMe} onClick={() => setModalType("draft")}>Save Draft</button>
          <button className={styles.btnDraft} onClick={() => setModalType("onlyme")}>Mark as Only Me</button>
          <button className={`${styles.btnPost} ${!name ? styles.btnPostDisabled : ''}`} onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <span className={styles.label}>Hub Name</span>
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

        <div className={styles.sectionRow}>
          {/* Resources Column */}
          <div className={styles.sectionCol}>
            <div className={styles.sectionHeader}>
              <span>Add Resource</span>
              <button className={styles.addBtn} onClick={() => setSelectModal("resource")}>
                <PlusIcon />
              </button>
            </div>
            <div className={styles.selectedList}>
              {selectedResources.includes(1) && (
                <div className={styles.selectedItem}>
                  <div className={styles.checkboxContainer}>
                    <div className={styles.checkbox} onClick={() => toggleResource(1)} style={{ cursor: 'pointer' }}>
                      <CheckIcon />
                    </div>
                  </div>
                  <DummyResourceCard title="Graphic Designer 80% wining rate CV" variant="purple" />
                </div>
              )}
              {selectedResources.includes(2) && (
                <div className={styles.selectedItem}>
                  <div className={styles.checkboxContainer}>
                    <div className={styles.checkbox} onClick={() => toggleResource(2)} style={{ cursor: 'pointer' }}>
                      <CheckIcon />
                    </div>
                  </div>
                  <DummyResourceCard title="Graphic Designer 80% wining rate CV" variant="orange" />
                </div>
              )}
              {selectedResources.includes(3) && (
                <div className={styles.selectedItem}>
                  <div className={styles.checkboxContainer}>
                    <div className={styles.checkbox} onClick={() => toggleResource(3)} style={{ cursor: 'pointer' }}>
                      <CheckIcon />
                    </div>
                  </div>
                  <DummyResourceCard title="Graphic Designer 80% wining rate CV" variant="orange" />
                </div>
              )}
            </div>
          </div>

          {/* Pathways Column */}
          <div className={styles.sectionCol}>
            <div className={styles.sectionHeader}>
              <span>Add Pathway</span>
              <button className={styles.addBtn} onClick={() => setSelectModal("pathway")}>
                <PlusIcon />
              </button>
            </div>
            <div className={styles.selectedList}>
              {selectedPathways.includes(1) && (
                <div className={styles.selectedItem}>
                  <div className={styles.checkboxContainer}>
                    <div className={styles.checkbox} onClick={() => togglePathway(1)} style={{ cursor: 'pointer' }}>
                      <CheckIcon />
                    </div>
                  </div>
                  <DummyPathwayCard title="Become a Full Stack Developer in 3 Months" variant="purple" />
                </div>
              )}
              {selectedPathways.includes(2) && (
                <div className={styles.selectedItem}>
                  <div className={styles.checkboxContainer}>
                    <div className={styles.checkbox} onClick={() => togglePathway(2)} style={{ cursor: 'pointer' }}>
                      <CheckIcon />
                    </div>
                  </div>
                  <DummyPathwayCard title="Become a Full Stack Developer in 3 Months" variant="orange" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Select Resource/Pathway Modal */}
      {selectModal && (
        <div className={styles.modalOverlay} onClick={() => setSelectModal(null)}>
          <div className={styles.selectResourceModal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.selectResourceTitle}>Select {selectModal === "resource" ? "Resource" : "Pathway"}</h3>
            <input type="text" className={styles.selectResourceSearch} placeholder="Search" />
            <div className={styles.selectResourceList}>
              {selectModal === "resource" ? (
                <>
                  {[1, 2, 3].map(id => {
                    const isSelected = selectedResources.includes(id);
                    return (
                      <label key={id} className={styles.selectResourceItem}>
                        <div className={`${styles.modalCheckbox} ${isSelected ? styles.modalCheckboxActive : ''}`}>
                          {isSelected && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                        </div>
                        <div style={{ pointerEvents: 'none', width: '100%' }}>
                          <DummyResourceCard title="Graphic Designer 80% wining rate CV" variant={id === 1 ? "purple" : "orange"} />
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => toggleResource(id)}
                        />
                      </label>
                    );
                  })}
                </>
              ) : (
                <>
                  {[1, 2].map(id => {
                    const isSelected = selectedPathways.includes(id);
                    return (
                      <label key={id} className={styles.selectResourceItem}>
                        <div className={`${styles.modalCheckbox} ${isSelected ? styles.modalCheckboxActive : ''}`}>
                          {isSelected && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                        </div>
                        <div style={{ pointerEvents: 'none', width: '100%' }}>
                          <DummyPathwayCard title="Become a Full Stack Developer in 3 Months" variant={id === 1 ? "purple" : "orange"} />
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => togglePathway(id)}
                        />
                      </label>
                    );
                  })}
                </>
              )}
            </div>
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
                <h3 className={styles.modalTitle}>Hub Updated!</h3>
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
                  <CloseIcon />
                </div>
                <h3 className={styles.modalTitle}>Hub Update Failed.</h3>
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
                <p className={styles.modalSubtitle}>Your hub is now saved in your drafts</p>
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
                <p className={styles.modalSubtitle}>Marking this item as Only Me will remove it from the public feed!</p>
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
