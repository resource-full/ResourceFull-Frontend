"use client";

import { useState } from "react";
import styles from "./AudienceFitTab.module.css";

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface AccordionSectionProps {
  title: string;
  selectedItems: string[];
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionSection({ title, selectedItems, isOpen, onToggle }: AccordionSectionProps) {
  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={onToggle}>
        <span className={styles.accordionTitle}>{title}</span>
        <div className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
          <ChevronDownIcon />
        </div>
      </button>
      {isOpen && (
        <div className={styles.accordionContent}>
          {selectedItems.map((item) => (
            <div key={item} className={styles.chip}>
              {item}
              <div className={styles.removeIcon}>
                <XIcon />
              </div>
            </div>
          ))}
          {/* Note: In a real implementation, you'd have a list of options to select from here, 
              but to match the design we just show the selected chips when open. */}
        </div>
      )}
    </div>
  );
}

export default function AudienceFitTab() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    role: true,
    industries: true,
    experience: true,
    skills: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.container}>
      <AccordionSection
        title="Target Role"
        selectedItems={["Law"]}
        isOpen={openSections["role"]}
        onToggle={() => toggleSection("role")}
      />
      <AccordionSection
        title="Target Industries"
        selectedItems={["SAAS"]}
        isOpen={openSections["industries"]}
        onToggle={() => toggleSection("industries")}
      />
      <AccordionSection
        title="Experience Level"
        selectedItems={["Mid"]}
        isOpen={openSections["experience"]}
        onToggle={() => toggleSection("experience")}
      />
      <AccordionSection
        title="Skill Set"
        selectedItems={["Figma"]}
        isOpen={openSections["skills"]}
        onToggle={() => toggleSection("skills")}
      />
    </div>
  );
}
