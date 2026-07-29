"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../setup.module.css";
import { INITIAL_FORM_DATA, COUNTRIES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/lib/constants/onboarding";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";

export default function ProfileSetupPage() {
  const router = useRouter();
  const [data, setData] = useState({ ...INITIAL_FORM_DATA });
  const [skillInput, setSkillInput] = useState("");

  // Dropdown open state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Location state (for Personal Information)
  const [personalLocation, setPersonalLocation] = useState<string[]>([]);

  // Industry state
  const [industry, setIndustry] = useState<string[]>([]);

  // Role location state (for Professional Experience)
  const [roleLocation, setRoleLocation] = useState<string[]>([]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleToggle = (level: string) => {
    setData((prev) => ({ ...prev, experienceLevel: level }));
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!data.skills.includes(skillInput.trim())) {
        setData((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleNext = () => {
    router.push("/onboarding/goals");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <p className={styles.subtitle}>A little bit about you.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Personal Information
        </h2>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>First Name</label>
            <input 
              className={styles.input} 
              placeholder="First Name" 
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Last Name</label>
            <input 
              className={styles.input} 
              placeholder="Last Name" 
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className={styles.field}>
          <FormMultiSelect
            label="Location"
            options={COUNTRIES.filter(c => c.value !== 'worldwide')}
            selected={personalLocation}
            onChange={setPersonalLocation}
            isOpen={openDropdown === 'personalLocation'}
            onToggle={() => toggleDropdown('personalLocation')}
            enableSearch
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
          Professional Experience
        </h2>
        
        <div className={styles.toggleGroup}>
          {["Student", "Entry Level", "Mid Level", "Senior"].map((level) => (
            <button
              key={level}
              className={`${styles.toggleBtn} ${data.experienceLevel === level ? styles.toggleBtnActive : ""}`}
              onClick={() => handleToggle(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className={styles.row} style={{ alignItems: "flex-end" }}>
          <div className={styles.field} style={{ flex: 2 }}>
            <label className={styles.label}>Current role</label>
            <input 
              className={styles.input} 
              placeholder="UI/UX Designer" 
              value={data.currentRole}
              onChange={(e) => setData({ ...data, currentRole: e.target.value })}
            />
          </div>
          <div className={styles.field} style={{ flex: 1 }}>
            <FormMultiSelect
              label="Industry"
              options={SKILLS_OPTIONS}
              selected={industry}
              onChange={setIndustry}
              isOpen={openDropdown === 'industry'}
              onToggle={() => toggleDropdown('industry')}
              enableSearch
            />
          </div>
          <div className={styles.field} style={{ flex: 1 }}>
            <FormMultiSelect
              label="Role Location"
              options={COUNTRIES.filter(c => c.value !== 'worldwide')}
              selected={roleLocation}
              onChange={setRoleLocation}
              isOpen={openDropdown === 'roleLocation'}
              onToggle={() => toggleDropdown('roleLocation')}
              enableSearch
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          Skills
        </h2>
        <div className={styles.chipContainer}>
          {data.skills.map((skill) => (
            <span key={skill} className={styles.chip}>
              {skill}
              <button onClick={() => removeSkill(skill)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </span>
          ))}
          <input
            className={styles.chipInput}
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
          />
        </div>
        <p style={{ fontSize: "12px", color: "#A0A0A0", marginTop: "-8px" }}>Click &quot;Enter&quot; to add skill</p>
      </div>

      <button className={styles.submitBtn} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
