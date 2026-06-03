/* ============================================================
   Onboarding — TypeScript Interfaces
   ============================================================ */

/** Complete form state across all three steps. */
export interface OnboardingFormData {
  /* Step 1 — Personal Info */
  firstName: string;
  lastName: string;
  username: string;

  /* Step 2 — Credentials */
  email: string;
  password: string;
  confirmPassword: string;

  /* Step 3 — Profile Setup */
  skills: string;
  experience: string;
  location: string;
  goals: string;
}

/** Validation errors keyed by field name. */
export type FormErrors = Partial<Record<keyof OnboardingFormData, string>>;

/** Shared props every step component receives. */
export interface StepProps {
  data: OnboardingFormData;
  errors: FormErrors;
  onChange: (field: keyof OnboardingFormData, value: string) => void;
  onNext: () => void;
  onBack?: () => void;
}

/** Option shape for Select & dropdown components. */
export interface SelectOption {
  value: string;
  label: string;
  icon?: string; // emoji or icon key
}
