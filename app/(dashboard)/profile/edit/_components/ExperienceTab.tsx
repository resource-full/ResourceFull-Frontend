import React from "react";
import styles from "./Tab.module.css";
import expStyles from "./ExperienceTab.module.css";

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  type: string; // Fulltime, Part-time, etc.
  dateRange: string;
  duration: string;
  location: string;
  linkedResources: string[];
}

interface ExperienceTabProps {
  experiences: ExperienceItem[];
  onImportLinkedIn: () => void;
  onAddExperience: () => void;
  onEditExperience: (id: string) => void;
  onDeleteExperience: (id: string) => void;
}

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0A66C2"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.66173 20.0003H4.07373V9.22735H7.66273V20.0003H7.66173ZM5.86773 7.75535C4.72173 7.75535 3.99973 6.99635 3.99973 6.04835C3.99973 5.07835 4.74373 4.34135 5.91173 4.34135C7.07873 4.34135 7.77773 5.07835 7.80073 6.04835C7.80073 6.99635 7.07873 7.75535 5.86773 7.75535ZM20.0007 20.0003H16.4117V14.2373C16.4117 12.7933 15.8947 11.8083 14.5997 11.8083C13.6127 11.8083 13.0277 12.4723 12.7697 13.1113C12.6757 13.3403 12.6517 13.6613 12.6517 13.9843V20.0003H9.06373C9.06373 20.0003 9.11173 10.1983 9.06373 9.22735H12.6517V10.7513C13.1277 10.0193 13.9747 8.97635 15.8607 8.97635C18.2047 8.97635 20.0007 10.5093 20.0007 13.8113V20.0003Z" fill="white"/>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default function ExperienceTab({
  experiences,
  onImportLinkedIn,
  onAddExperience,
  onEditExperience,
  onDeleteExperience,
}: ExperienceTabProps) {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitle}>Experience</h2>
        <p className={styles.tabSubtitle}>Add roles and <span style={{color: '#024A94'}}>connect your resources as proof of work</span></p>
      </div>

      <div className={expStyles.linkedinBanner}>
        <div className={expStyles.linkedinInfo}>
          <LinkedinIcon />
          <div className={expStyles.linkedinText}>
            <span className={expStyles.linkedinTitle}>Import from LinkedIn</span>
            <span className={expStyles.linkedinSubtitle}>Automatically pull in your experience — then link your resources as proof</span>
          </div>
        </div>
        <button className={expStyles.linkedinBtn} onClick={onImportLinkedIn}>
          Import Linkedin
        </button>
      </div>

      <div className={expStyles.experiencesList}>
        {experiences.map((exp) => (
          <div key={exp.id} className={expStyles.experienceItem}>
            <div className={expStyles.expHeader}>
              <div className={expStyles.expMainInfo}>
                <h3 className={expStyles.expTitle}>{exp.title}</h3>
                <p className={expStyles.expMeta}>
                  {exp.company} • {exp.type}
                </p>
                <p className={expStyles.expMeta}>
                  {exp.dateRange} • {exp.duration}
                </p>
                <p className={expStyles.expMeta}>{exp.location}</p>
              </div>
              <div className={expStyles.expActions}>
                <button type="button" className={expStyles.actionBtn} onClick={() => onEditExperience(exp.id)}>
                  <EditIcon />
                </button>
                <button type="button" className={expStyles.actionBtn} onClick={() => onDeleteExperience(exp.id)}>
                  <TrashIcon />
                </button>
              </div>
            </div>

            <div className={expStyles.linkedResourcesSection}>
              <div className={expStyles.linkedHeader}>
                <span className={expStyles.linkedTitle}>Linked Resources ({exp.linkedResources.length})</span>
                <button className={expStyles.linkResourceBtn}>Link Resource</button>
              </div>
              {exp.linkedResources.length > 0 && (
                <div className={expStyles.resourcesTags}>
                  {exp.linkedResources.map((res, i) => (
                    <div key={i} className={expStyles.resourceTag}>
                      {res}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className={expStyles.addExpBtn} onClick={onAddExperience}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add experience
      </button>

    </div>
  );
}
