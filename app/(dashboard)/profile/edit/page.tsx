"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import DashboardHeader, { DashboardFilters } from "../../_components/DashboardHeader";
import { SuccessModal, ErrorModal } from "@/app/components/ui";
import { userAPI } from "@/app/lib/api/user";

// Sidebar & Tabs
import EditProfileSidebar, { EditProfileTab } from "./_components/EditProfileSidebar";
import BasicInfoTab from "./_components/BasicInfoTab";
import AboutTab from "./_components/AboutTab";
import SkillsTab from "./_components/SkillsTab";
import ExperienceTab, { ExperienceItem } from "./_components/ExperienceTab";
import GoalsTab from "./_components/GoalsTab";

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default function EditProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<EditProfileTab>("basic-info");
  
  // Dashboard header filter state (required)
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  // --- Profile State ---
  // Basic Info
  const [coverPhoto, setCoverPhoto] = useState<string | null>("linear-gradient(90deg, #d4a72d 0%, #a6d88c 100%)");
  const [avatar, setAvatar] = useState<string | null>("/assets/9fa8a96b7774ec94ca80cf93ebd4ece37578f603.jpg");
  const [firstName, setFirstName] = useState("Adaeze");
  const [lastName, setLastName] = useState("Okafor");
  const [username, setUsername] = useState("Adaeze");
  const [location, setLocation] = useState("Nigeria");
  const [currentCareer, setCurrentCareer] = useState("");

  // About
  const [bio, setBio] = useState("Senior PM at Google Lagos · Building career resources for ambitious Africans. Previously Paystack, Andela.");
  const [industry, setIndustry] = useState("Design");
  const [experienceLevel, setExperienceLevel] = useState("Undergraduate");

  // Skills
  const [skills, setSkills] = useState<string[]>(["Product Designer", "Business Analyst"]);

  // Goals
  const [currentGoals, setCurrentGoals] = useState("Preparing applications for the Schwarzman Scholars and Google Fellowship programmes in Q4 2026. Also building a course on African fintech product strategy.");
  const [primaryGoal, setPrimaryGoal] = useState("Skillbuilding");
  const [goalTimeline, setGoalTimeline] = useState<string[]>(["6_months"]);

  // Experience
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "exp-1",
      title: "Senior Product Manager",
      company: "Google",
      type: "Fulltime",
      dateRange: "Jan 2023 - Present",
      duration: "1yr 4 mos",
      location: "Nigeria",
      linkedResources: ["PM CV — Lagos tech market", "PM CV — Lagos tech market", "PM CV — Lagos tech market"],
    },
    {
      id: "exp-2",
      title: "Senior Product Manager",
      company: "Google",
      type: "Fulltime",
      dateRange: "Jan 2023 - Present",
      duration: "1yr 4 mos",
      location: "Nigeria",
      linkedResources: ["PM CV — Lagos tech market", "PM CV — Lagos tech market", "PM CV — Lagos tech market"],
    }
  ]);

  // Modal / save states
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Load from API on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getUserProfile();
        if (res.success && res.data) {
          const parsed = res.data;
          if (parsed.firstName) setFirstName(parsed.firstName);
          if (parsed.lastName) setLastName(parsed.lastName);
          if (parsed.email) setUsername(parsed.email.split('@')[0]);
          if (parsed.location) setLocation(parsed.location);
          if (parsed.bio || parsed.shortDescription) setBio(parsed.bio || parsed.shortDescription || "");
          if (parsed.industry) setIndustry(parsed.industry);
          if (parsed.professionalExperience) setExperienceLevel(parsed.professionalExperience);
          if (parsed.currentCareer) setCurrentCareer(parsed.currentCareer);
          if (parsed.skills) setSkills(parsed.skills);
          if (parsed.primaryCareerGoal) setPrimaryGoal(parsed.primaryCareerGoal);
          if (parsed.goalReviewTimeline) setGoalTimeline([parsed.goalReviewTimeline]);
          if (parsed.avatar) setAvatar(parsed.avatar);
          if (parsed.coverImage) setCoverPhoto(parsed.coverImage);
        }
      } catch (e) {
        console.error("Error reading profile data from API:", e);
      }
    };
    fetchProfile();
  }, []);

  const getProfileDataPayload = () => {
    const payload: any = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
      location,
      bio,
      experienceLevel,
      currentCareer: currentCareer || industry,
      skills,
      primaryGoal,
      goalTimeline,
    };
    
    if (avatar) payload.avatar = avatar;
    if (coverPhoto) payload.coverPhoto = coverPhoto;

    return payload;
  };

  const handleDone = async () => {
    setIsSaving(true);
    const profileData = getProfileDataPayload();

    try {
      const response = await userAPI.updateUserProfile(profileData);
      if (response.success) {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = () => {
    const profileData = getProfileDataPayload();
    localStorage.setItem("resourcefull_profile_data_v2", JSON.stringify(profileData));
    alert("Draft saved successfully!");
  };

  // Handlers for generic onChange
  const handleStringChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (field: string, value: string) => setter(value);

  const handleGenericChange = (setterMap: Record<string, Function>) => (field: string, value: any) => {
    if (setterMap[field]) {
      setterMap[field](value);
    }
  };

  const aboutSetters = {
    bio: setBio,
    industry: setIndustry,
    experienceLevel: setExperienceLevel,
  };

  const goalsSetters = {
    currentGoals: setCurrentGoals,
    primaryGoal: setPrimaryGoal,
    goalTimeline: setGoalTimeline,
  };
  
  const basicInfoSetters = {
    firstName: setFirstName,
    lastName: setLastName,
    username: setUsername,
    location: setLocation,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic-info":
        return (
          <BasicInfoTab
            coverPhoto={coverPhoto}
            avatar={avatar}
            firstName={firstName}
            lastName={lastName}
            username={username}
            location={location}
            onCoverChange={setCoverPhoto}
            onAvatarChange={setAvatar}
            onChange={handleGenericChange(basicInfoSetters)}
          />
        );
      case "about":
        return (
          <AboutTab
            bio={bio}
            industry={industry}
            experienceLevel={experienceLevel}
            onChange={handleGenericChange(aboutSetters)}
          />
        );
      case "skills":
        return (
          <SkillsTab
            skills={skills}
            onChange={setSkills}
          />
        );
      case "experience":
        return (
          <ExperienceTab
            experiences={experiences}
            onImportLinkedIn={() => {
              alert("LinkedIn integration coming soon!");
            }}
            onAddExperience={() => {
              alert("Add experience modal coming soon!");
            }}
            onEditExperience={(id) => {
              alert(`Edit experience ${id} coming soon!`);
            }}
            onDeleteExperience={(id) => {
              if(confirm("Are you sure you want to delete this experience?")) {
                setExperiences(experiences.filter(exp => exp.id !== id));
              }
            }}
          />
        );
      case "goals":
        return (
          <GoalsTab
            currentGoals={currentGoals}
            primaryGoal={primaryGoal}
            goalTimeline={goalTimeline}
            onChange={handleGenericChange(goalsSetters)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      {/* Header bar */}
      <div className={styles.pageHeader}>
        <div className={styles.titleGroup}>
          <Link href="/profile" className={styles.backButton}>
            <BackIcon />
          </Link>
          <h1 className={styles.pageTitle}>Edit Profile</h1>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSaveDraft}
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            Save Draft
          </button>
          <button
            type="button"
            className={styles.btnDone}
            onClick={handleDone}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Done"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <EditProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className={styles.tabContent}>
          {renderTabContent()}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          title="Done!"
          subtitle="Your profile has been updated successfully"
          buttonText="See Profile"
          redirectTo="/profile"
          onClose={() => setShowSuccess(false)}
        />
      )}

      {/* Error Modal */}
      {showError && (
        <ErrorModal
          title="Profile Edit Failed"
          subtitle="Whoops! There seems to be an issue. Please try again."
          primaryButtonText="Try again"
          secondaryButtonText="Go to profile"
          onPrimary={() => {
            setShowError(false);
            handleDone();
          }}
          onSecondary={() => {
            setShowError(false);
            router.push("/profile");
          }}
          onClose={() => setShowError(false)}
        />
      )}

    </div>
  );
}
