"use client";

import { useState, useEffect } from "react";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";
import { COUNTRIES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/lib/constants/onboarding";
import { resourceAPI } from "@/app/lib/api/resource";
import { pathwayAPI } from "@/app/lib/api/pathway";
import { hubAPI } from "@/app/lib/api/hub";
import { CreateHubRequest } from "@/app/lib/types/hub";
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

export default function AddHubPage() {
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Selected Items State
  // Selected Items State (now storing string IDs)
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);

  // Fetched Data
  const [resources, setResources] = useState<Resource[]>([]);
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Modal State
  const [modalType, setModalType] = useState<"success" | "error" | "draft" | null>(null);
  const [selectModal, setSelectModal] = useState<"resource" | "pathway" | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRes, pathRes] = await Promise.all([
          resourceAPI.getAllResources(),
          pathwayAPI.getAllPathways()
        ]);
        if (resRes.success && resRes.data.resources) {
          setResources(resRes.data.resources);
        }
        if (pathRes.success && pathRes.data.pathways) {
          setPathways(pathRes.data.pathways);
        }
      } catch (error) {
        console.error("Failed to fetch data for modal:", error);
      } finally {
        setIsDataLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handlePost = async () => {
    if (name && description) {
      try {
        const payload: CreateHubRequest = {
          name,
          description,
          industry: industries[0] || "Software Development",
          applicableLocation: locations[0] || "Worldwide",
          experience: experiences[0] || "Professional",
          ...(selectedResources.length > 0 && { resources: selectedResources }),
          ...(selectedPathways.length > 0 && { pathways: selectedPathways }),
        };
        const response = await hubAPI.createHub(payload);
        if (response.success) {
          setModalType("success");
        } else {
          console.error("API error:", response.message);
          setModalType("error");
        }
      } catch (error) {
        console.error("Failed to create hub:", error);
        setModalType("error");
      }
    } else {
      setModalType("error");
    }
  };

  const handleSaveDraft = () => {
    setModalType("draft");
  };

  const closeModal = () => {
    setModalType(null);
    if (modalType === "success") {
      setName("");
      setDescription("");
      setLocations([]);
      setExperiences([]);
      setIndustries([]);
      setSelectedResources([]);
      setSelectedPathways([]);
    }
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
        <h1 className={styles.title}>Create Hub</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnDraft} onClick={handleSaveDraft}>Back</button>
          <button className={styles.btnNext} onClick={handlePost}>Done</button>
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
              {selectedResources.map((id, idx) => {
                const res = resources.find(r => (r._id || r.id) === id);
                if (!res) return null;
                return (
                  <div key={id} className={styles.selectedItem}>
                    <div className={styles.checkboxContainer}>
                      <div className={styles.checkbox} onClick={() => toggleResource(id)} style={{ cursor: 'pointer' }}>
                        <CheckIcon />
                      </div>
                    </div>
                    <DummyResourceCard title={res.name} variant={idx % 2 === 0 ? "purple" : "orange"} />
                  </div>
                );
              })}
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
              {selectedPathways.map((id, idx) => {
                const pw = pathways.find(p => (p._id || p.id) === id);
                if (!pw) return null;
                return (
                  <div key={id} className={styles.selectedItem}>
                    <div className={styles.checkboxContainer}>
                      <div className={styles.checkbox} onClick={() => togglePathway(id)} style={{ cursor: 'pointer' }}>
                        <CheckIcon />
                      </div>
                    </div>
                    <DummyPathwayCard title={pw.name} variant={idx % 2 === 0 ? "purple" : "orange"} />
                  </div>
                );
              })}
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
              {isDataLoading ? (
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>Loading data...</div>
              ) : selectModal === "resource" ? (
                <>
                  {resources.map((res, idx) => {
                    const id = res._id || res.id;
                    const isSelected = selectedResources.includes(id);
                    return (
                      <label key={id} className={styles.selectResourceItem}>
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
                          onChange={() => toggleResource(id)} 
                        />
                      </label>
                    );
                  })}
                </>
              ) : (
                <>
                  {pathways.map((pw, idx) => {
                    const id = pw._id || pw.id;
                    const isSelected = selectedPathways.includes(id);
                    return (
                      <label key={id} className={styles.selectResourceItem}>
                        <div className={`${styles.modalCheckbox} ${isSelected ? styles.modalCheckboxActive : ''}`}>
                          {isSelected && <span style={{ color: '#fff' }}><CheckIcon /></span>}
                        </div>
                        <div style={{ pointerEvents: 'none', width: '100%' }}>
                          <DummyPathwayCard title={pw.name} variant={idx % 2 === 0 ? "purple" : "orange"} />
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
                <h3 className={styles.modalTitle}>Hub Created!</h3>
                <p className={styles.modalSubtitle}>Your hub is live and visible to your audience</p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={() => window.location.href = '#'}>Go to Profile</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={closeModal}>Create More</button>
                </div>
              </>
            )}
            {modalType === "error" && (
              <>
                <div className={`${styles.modalIcon} ${styles.modalIconError}`}>
                  <CloseIcon />
                </div>
                <h3 className={styles.modalTitle}>Hub Creation Failed.</h3>
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
                <p className={styles.modalSubtitle}>Your hub is now saved in your drafts</p>
                <div className={styles.modalActions}>
                  <button className={`${styles.modalBtn} ${styles.modalBtnOutline}`} onClick={() => window.location.href = '#'}>Go to Profile</button>
                  <button className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={closeModal}>Create More</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
