"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";
import { COUNTRIES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/lib/constants/onboarding";
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

// Dummy resource card for the builder
const DummyResourceCard = ({ title }: { title: string }) => (
  <div style={{ background: '#7c3aed', color: '#fff', borderRadius: '12px', padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
    <div style={{ display: 'flex', gap: '8px' }}>
      <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>Design</span>
      <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>CV</span>
    </div>
  </div>
);

type PathwayNodeType = "text" | "resource";

interface PathwayNode {
  id: string;
  type: PathwayNodeType;
  title: string;
  content: string;
  resourceId?: string;
  resourceTitle?: string;
}

export default function EditPathwayPage() {
  const router = useRouter();
  const params = useParams();
  const pathwayId = params.id as string;
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Builder State
  const [nodes, setNodes] = useState<PathwayNode[]>([]);
  const [selectResourceModalNodeId, setSelectResourceModalNodeId] = useState<string | null>(null);

  // Step 2: Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [hubs, setHubs] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isResourcesLoading, setIsResourcesLoading] = useState(true);

  // Modal State
  const [modalType, setModalType] = useState<"success" | "error" | "draft" | "onlyme" | "back" | null>(null);

  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!pathwayId) return;
    const fetchPathway = async () => {
      try {
        const res = await pathwayAPI.getSinglePathway(pathwayId);
        if (res.success && res.data) {
          const pathway: Pathway = res.data;
          setName(pathway.name || "");
          setDescription(pathway.description || "");
          setLocations(pathway.applicableLocation ? pathway.applicableLocation.split(",").map((s) => s.trim()).filter(Boolean) : []);
          setExperiences(pathway.experience ? pathway.experience.split(",").map((s) => s.trim()).filter(Boolean) : []);
          setIndustries(pathway.industry ? pathway.industry.split(",").map((s) => s.trim()).filter(Boolean) : []);
          setIsFree(pathway.isFree);
          setPrice(pathway.price ? String(pathway.price) : "");
          if (pathway.hub?._id) {
            setHubs([pathway.hub._id]);
          }
          if (pathway.blocks && pathway.blocks.length > 0) {
            setNodes(
              pathway.blocks.map((block, index) => ({
                id: block._id || String(index + 1),
                type: block.type === "resource" ? "resource" : "text",
                title: block.name || "",
                content: block.shortDescription || "",
                resourceId: block.resource || undefined,
                resourceTitle: block.resource || undefined,
              }))
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch pathway:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchPathway();
  }, [pathwayId]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await resourceAPI.getAllResources();
        if (res.success && res.data.resources) {
          setResources(res.data.resources);
        }
      } catch (error) {
        console.error("Failed to fetch resources for modal:", error);
      } finally {
        setIsResourcesLoading(false);
      }
    };
    fetchResources();
  }, []);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const addNode = (type: PathwayNodeType) => {
    const newNode: PathwayNode = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: "",
      content: ""
    };
    setNodes([...nodes, newNode]);
    if (type === "resource") {
      setSelectResourceModalNodeId(newNode.id);
    }
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const updateNode = (id: string, updates: Partial<PathwayNode>) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const handleResourceSelected = (resourceId: string, resourceTitle: string) => {
    if (selectResourceModalNodeId) {
      updateNode(selectResourceModalNodeId, { resourceTitle, resourceId });
      setSelectResourceModalNodeId(null);
    }
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
        blocks: nodes.map((node, index) => ({
          type: node.type,
          name: node.title,
          shortDescription: node.content,
          order: index + 1,
          resource: node.type === "resource" ? node.resourceId : undefined,
        })),
        applicableLocation: locations.join(","),
        experience: experiences.join(","),
        industry: industries.join(","),
        isFree,
        price: Number(price.replace(/[^0-9.]/g, "")) || 0,
        currency: "USD",
        tags: [],
        hubId: hubs[0],
      };
      const res = await pathwayAPI.updatePathway(pathwayId, payload);
      if (res?.data) {
        setModalType("success");
      } else {
        setModalType("error");
      }
    } catch (error) {
      console.error("Failed to update pathway:", error);
      setModalType("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await pathwayAPI.changeStatus(pathwayId, "draft");
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
      await pathwayAPI.changeStatus(pathwayId, "private");
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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.backTitle} onClick={handleBackClick}>
          <ArrowLeftIcon />
          <h1 className={styles.title}>Edit Pathway</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.linkOnlyMe} onClick={handleSaveDraft} disabled={isFetching || isSaving}>Save Draft</button>
          <button className={styles.btnDraft} onClick={() => setModalType("onlyme")} disabled={isFetching || isSaving}>Mark as Only Me</button>
          {step === 1 ? (
            <button className={styles.btnPost} onClick={() => setStep(2)} disabled={isFetching}>Next</button>
          ) : (
            <>
              <button className={styles.linkOnlyMe} onClick={() => setStep(1)}>Back</button>
              <button className={`${styles.btnPost} ${(!name || isFetching || isSaving) ? styles.btnPostDisabled : ''}`} onClick={handleUpdate} disabled={isFetching || isSaving}>
                {isSaving ? "Saving..." : "Update"}
              </button>
            </>
          )}
        </div>
      </div>

      {step === 1 && (
        <div className={styles.builderContainer}>
          <div className={styles.timelineLine}></div>

          {nodes.map((node, index) => (
            <div key={node.id} className={styles.stepItem}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepBadge}>{node.type === "text" ? "Text" : "Resource"}</span>
                  <input
                    type="text"
                    className={styles.stepTitleInput}
                    placeholder={node.type === "text" ? "Introduction" : "Use this CV Template"}
                    value={node.title}
                    onChange={(e) => updateNode(node.id, { title: e.target.value })}
                  />
                  <button className={styles.removeBtn} onClick={() => removeNode(node.id)}>
                    <CloseIcon />
                  </button>
                </div>

                <div className={styles.stepBody}>
                  {node.type === "text" ? (
                    <textarea
                      className={styles.stepTextarea}
                      placeholder="Lorem ipsum dolor"
                      value={node.content}
                      onChange={(e) => updateNode(node.id, { content: e.target.value })}
                    />
                  ) : (
                    <div className={styles.resourceWrapper}>
                      {node.resourceTitle ? (
                        <>
                          <DummyResourceCard title={node.resourceTitle} />
                          <button className={styles.replaceTextBtn} onClick={() => setSelectResourceModalNodeId(node.id)}>
                            Replace
                          </button>
                        </>
                      ) : (
                        <button className={styles.replaceTextBtn} onClick={() => setSelectResourceModalNodeId(node.id)}>
                          Select Resource
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className={styles.endDot}>
            <div className={styles.endDotInner}></div>
          </div>

          <div className={styles.addButtonsRow}>
            <button className={styles.addBlockBtn} onClick={() => addNode("text")}>
              <PlusIcon /> Add Text
            </button>
            <button className={styles.addBlockBtn} onClick={() => addNode("resource")}>
              <PlusIcon /> Add Resource
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <span className={styles.label}>Pathway Name</span>
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
            options={[
              { value: "create", label: "+ Create Hub", icon: "" },
              { value: "cv", label: "CV Templates" },
              { value: "js", label: "JS Codes" }
            ]}
            selected={hubs}
            onChange={setHubs}
            isOpen={openDropdown === 'hub'}
            onToggle={() => toggleDropdown('hub')}
          />
        </div>
      )}

      {/* Select Resource Modal */}
      {selectResourceModalNodeId && (
        <div className={styles.modalOverlay} onClick={() => setSelectResourceModalNodeId(null)}>
          <div className={styles.selectResourceModal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.selectResourceTitle}>Select Resource</h3>
            <input type="text" className={styles.selectResourceSearch} placeholder="Search" />
            <div className={styles.selectResourceList}>
              {isResourcesLoading ? (
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>Loading resources...</div>
              ) : resources.length > 0 ? (
                resources.map((res) => (
                  <label key={res._id || res.id} className={styles.selectResourceItem}>
                    <div className={styles.checkbox}></div>
                    <div style={{ pointerEvents: 'none', width: '100%' }}>
                      <DummyResourceCard title={res.name} />
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() => handleResourceSelected(res._id || res.id, res.name)}
                    />
                  </label>
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>No resources found.</div>
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
                <h3 className={styles.modalTitle}>Pathway Updated!</h3>
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
                <h3 className={styles.modalTitle}>Pathway Update Failed.</h3>
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
                <p className={styles.modalSubtitle}>Your pathway is now saved in your drafts</p>
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
                <p className={styles.modalSubtitle}>Marking this item as Only Me will remove it from the public feed, and associated hubs!</p>
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
