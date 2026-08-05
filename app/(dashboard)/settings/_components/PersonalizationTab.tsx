"use client";

import styles from "./PersonalizationTab.module.css";

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

interface PersonalizationTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function PersonalizationTab({ formData, setFormData }: PersonalizationTabProps) {
  const updateSocials = (platform: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Customize your shareable link</h3>
        
        <div className={styles.inputGroup}>
          <span className={styles.label}>Custom Slug</span>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              className={styles.input} 
              value={formData.username || ""} 
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="rf.co/yourname"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Add social links</h3>
        
        <div className={styles.socialInputs}>
          <div className={styles.inputGroup}>
            <span className={styles.label}>LinkedIn</span>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper}>
                <LinkedInIcon />
              </div>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Paste Link" 
                value={formData.socials?.linkedin || ""}
                onChange={(e) => updateSocials("linkedin", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.label}>X(Twitter)</span>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper} style={{ color: "#11243d" }}>
                <XIcon />
              </div>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Paste Link"
                value={formData.socials?.x || ""}
                onChange={(e) => updateSocials("x", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.label}>Instagram</span>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper} style={{ color: "#11243d" }}>
                <InstagramIcon />
              </div>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Paste Link"
                value={formData.socials?.instagram || ""}
                onChange={(e) => updateSocials("instagram", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.label}>Facebook</span>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper} style={{ color: "#1877F2" }}>
                <FacebookIcon />
              </div>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Paste Link"
                value={formData.socials?.facebook || ""}
                onChange={(e) => updateSocials("facebook", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
