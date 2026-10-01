"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";
import { COUNTRIES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/lib/constants/onboarding";
import { hubAPI } from "@/app/lib/api/hub";
import { resourceAPI } from "@/app/lib/api/resource";
import { pathwayAPI } from "@/app/lib/api/pathway";
import { Resource } from "@/app/lib/types/resource";
import { Pathway } from "@/app/lib/types/pathway";
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
  const params = useParams();
  const hubId = params.id as string;

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Available items for the select modal
  const [availableResources, setAvailableResources] = useState<Resource[]>([]);
  const [availablePathways, setAvailablePathways] = useState<Pathway[]>([]);

  // Selected Items State — arrays of real IDs (strings)
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);

  // Modal State
  const [modalType, setModalType] = useState<"success" | "error" | "draft" | "onlyme" | "back" | null>(null);
  const [selectModal, setSelectModal] = useState<"resource" | "pathway" | null>(null);

  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!hubId) return;
    const fetchHub = async () => {
      try {
        const res = await hubAPI.getSingleHub(hubId);
        if (res.success && res.data) {
          const hub = res.data;
          setName(hub.name || "");
          setDescription(hub.description || "");
          setLocations(hub.applicableLocation ? hub.applicableLocation.split(",").map((s) => s.trim()).filter(Boolean) : []);
          setExperiences(hub.experience ? hub.experience.split(",").map((s) => s.trim()).filter(Boolean) : []);
          setIndustries(hub.industry ? hub.industry.split(",").map((s) => s.trim()).filter(Boolean) : []);
          setSelectedResources(hub.resources || []);
          setSelectedPathways(hub.pathways || []);
        }
      } catch (error) {
        console.error("Failed to fetch hub:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchHub();
  }, [hubId]);

  useEffect(() => {
    const fetchAvailable = async () => {
      try {
        const [resRes, pathRes] = await Promise.all([
          resourceAPI.getAllResources(),
          pathwayAPI.getAllPathways(),
        ]);
        if (resRes.success && resRes.data.resources) {
          setAvailableResources(resRes.data.resources);
        }
        if (pathRes.success && pathRes.data.pathways) {
          setAvailablePathways(pathRes.data.pathways);
        }
      } catch (error) {
        console.error("Failed to fetch available resources/pathways:", error);
      }
    };
    fetchAvailable();
  }, []);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleUpdate = async () => {
    if (!name || !description) {
      setModalType("error");
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        name,
        description,
        industry: industries.join(","),
        applicableLocation: locations.join(","),
        experience: experiences.join(","),
        resources: selectedResources,
        pathways: selectedPathways,
      };
      const res = await hubAPI.updateHub(hubId, payload);
      if (res?.data) {
        setModalType("success");
      } else {
        setModalType("error");
      }
    } catch (error) {
      console.error("Failed to update hub:", error);
      setModalType("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await hubAPI.changeStatus(hubId, "draft");
      setModalType("draft");
    } catch (error) {
      console.error("Failed to save draft:", error);
      setModalType("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkAsOnlyMe = async () => {
    setIsSaving(true);
    try {
      await hubAPI.changeStatus(hubId, "private");
      closeModal();
    } catch (error) {
      console.error("Failed to mark as only me:", error);
      setModalType("error");
    } finally {
      setIsSaving(false);
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

  const toggleResource = (id: string) => {
    if (selectedResources.includes(id)) {
      setSelectedResources(selectedResources.filter(r => r !== id));
    } else {
      setSelectedResources([...selectedResources, id]);
    }
  };

  const togglePathway = (id: string) => {
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
          <button className={styles.linkOnlyMe} onClick={handleSaveDraft} disabled={isFetching || isSaving}>Save Draft</button>
          <button className={styles.btnDraft} onClick={() => setModalType("onlyme")} disabled={isFetching || isSaving}>Mark as Only Me</button>
          <button className={`${styles.btnPost} ${(!name || isFetching || isSaving) ? styles.btnPostDisabled : ''}`} onClick={handleUpdate} disabled={isFetching || isSaving}>
            {isSaving ? "Saving..." : "Update"}
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
              {selectedResources.map((resId) => {
                const res = availableResources.find(r => (r._id || r.id) === resId);
                if (!res) return null;
                return (
                  <div key={resId} className={styles.selectedItem}>
                    <div className={styles.checkboxContainer}>
                      <div className={styles.checkbox} onClick={() => toggleResource(resId)} style={{ cursor: 'pointer' }}>
                        <CheckIcon />
                      </div>
                    </div>
                    <DummyResourceCard title={res.name} variant="purple" />
                  </div>
                );
              })}
              {selectedResources.length === 0 && (
                <div style={{ color: "#8c95a6", fontSize: "0.875rem", padding: "12px" }}>No resources added yet.</div>
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
              {selectedPathways.map((pathId) => {
                const path = availablePathways.find(p => (p._id || p.id) === pathId);
                if (!path) return null;
                return (
                  <div key={pathId} className={styles.selectedItem}>
                    <div className={styles.checkboxContainer}>
                      <div className={styles.checkbox} onClick={() => togglePathway(pathId)} style={{ cursor: 'pointer' }}>
                        <CheckIcon />
                      </div>
                    </div>
                    <DummyPathwayCard title={path.name} variant="purple" />
                  </div>
                );
              })}
              {selectedPathways.length === 0 && (
                <div style={{ color: "#8c95a6", fontSize: "0.875rem", padding: "12px" }}>No pathways added yet.</div>
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
                availableResources.length > 0 ? (
                  availableResources.map((res, idx) => {
                    const resId = res._id || res.id;
                    const isSelected = selectedResources.includes(resId);
                    return (
                      <label key={resId} className={styles.selectResourceItem}>
                        <div className={`${styles.modalCheckbox} ${isSelected ? styles.modalCheckboxActive : ''}`}>
                          {isSelected && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                        </div>
                        <div style={{ pointerEvents: 'none', width: '100%' }}>
                          <DummyResourceCard title={res.name} variant={idx % 2 === 0 ? "purple" : "orange"} />
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => toggleResource(resId)}
                        />
                      </label>
                    );
                  })
                ) : (
                  <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>No resources found.</div>
                )
              ) : (
                availablePathways.length > 0 ? (
                  availablePathways.map((path, idx) => {
                    const pathId = path._id || path.id;
                    const isSelected = selectedPathways.includes(pathId);
                    return (
                      <label key={pathId} className={styles.selectResourceItem}>
                        <div className={`${styles.modalCheckbox} ${isSelected ? styles.modalCheckboxActive : ''}`}>
                          {isSelected && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                        </div>
                        <div style={{ pointerEvents: 'none', width: '100%' }}>
                          <DummyPathwayCard title={path.name} variant={idx % 2 === 0 ? "purple" : "orange"} />
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => togglePathway(pathId)}
                        />
                      </label>
                    );
                  })
                ) : (
                  <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>No pathways found.</div>
                )
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
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={handleMarkAsOnlyMe} disabled={isSaving}>Proceed</button>
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
