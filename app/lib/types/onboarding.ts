/* ============================================================
   Onboarding — TypeScript Interfaces
   ============================================================ */

/** Complete form state across all three steps. */
export interface OnboardingFormData {
  /* Step 1 — Account Creation */
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  /* Profile Step */
  location: string;
  experienceLevel: string; // Student, Entry Level, Mid Level, Senior
  currentRole: string;
  industry: string;
  country: string;
  skills: string[];

  /* Goals Step */
  primaryGoal: string;
  targetRoles: string[];
  goalTimeline: string; // 6-months, 1-year
}

/** Validation errors keyed by field name. */
export type FormErrors = Partial<Record<keyof OnboardingFormData, string>>;

/** Shared props every step component receives. */
export interface StepProps {
  data: OnboardingFormData;
  errors: FormErrors;
  onChange: (field: keyof OnboardingFormData, value: any) => void;
  onNext: () => void;
  onBack?: () => void;
}

/** Option shape for Select & dropdown components. */
export interface SelectOption {
  value: string;
  label: string;
  icon?: string; // emoji or icon key
}
