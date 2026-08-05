"use client";

import { useState } from "react";
import styles from "./AudienceFitTab.module.css";
import FormMultiSelect from "@/app/components/ui/FormMultiSelect";
import { TARGET_ROLES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/lib/constants/onboarding";

interface AudienceFitTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function AudienceFitTab({ formData, setFormData }: AudienceFitTabProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const roleOptions = TARGET_ROLES.map(role => ({ value: role, label: role }));

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <FormMultiSelect
          label="Target Role"
          options={roleOptions}
          selected={formData.targetRoles || []}
          onChange={(val) => setFormData({ ...formData, targetRoles: val })}
          isOpen={openDropdown === "role"}
          onToggle={() => toggleDropdown("role")}
          enableSearch
        />
        <FormMultiSelect
          label="Target Industries"
          options={SKILLS_OPTIONS}
          selected={formData.industry || []}
          onChange={(val) => setFormData({ ...formData, industry: val })}
          isOpen={openDropdown === "industries"}
          onToggle={() => toggleDropdown("industries")}
          enableSearch
        />
        <FormMultiSelect
          label="Experience Level"
          options={EXPERIENCE_OPTIONS}
          selected={formData.experience || []}
          onChange={(val) => setFormData({ ...formData, experience: val })}
          isOpen={openDropdown === "experience"}
          onToggle={() => toggleDropdown("experience")}
        />
        <FormMultiSelect
          label="Skill Set"
          options={SKILLS_OPTIONS}
          selected={formData.skills || []}
          onChange={(val) => setFormData({ ...formData, skills: val })}
          isOpen={openDropdown === "skills"}
          onToggle={() => toggleDropdown("skills")}
          enableSearch
        />
      </div>
    </div>
  );
}
