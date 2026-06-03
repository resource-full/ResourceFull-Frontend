"use client";

import { useState, useCallback } from "react";
import type {
  OnboardingFormData,
  FormErrors,
} from "@/app/lib/types/onboarding";
import { INITIAL_FORM_DATA, TOTAL_STEPS } from "@/app/lib/constants/onboarding";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import CredentialsStep from "./steps/CredentialsStep";
import ProfileSetupStep from "./steps/ProfileSetupStep";
import SuccessModal from "@/app/components/ui/SuccessModal";
import styles from "../page.module.css";

/* ============================================================
   Validation Helpers
   ============================================================ */

function validateStep1(data: OnboardingFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.username.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    errors.username = "Use only letters, numbers, and underscores";
  }
  return errors;
}

function validateStep2(data: OnboardingFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Must be at least 8 characters";
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}

function validateStep3(data: OnboardingFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.skills) errors.skills = "Please select a skill";
  if (!data.experience) errors.experience = "Please select your experience";
  if (!data.location) errors.location = "Please select your location";
  if (!data.goals) errors.goals = "Please select a goal";
  return errors;
}

const validators = [validateStep1, validateStep2, validateStep3];

/* ============================================================
   Toast Component (inline)
   ============================================================ */

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        <span>{type === "success" ? "✓" : "✕"}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   OnboardingForm
   ============================================================ */

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [data, setData] = useState<OnboardingFormData>({
    ...INITIAL_FORM_DATA,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 4000);
    },
    []
  );

  const handleChange = useCallback(
    (field: keyof OnboardingFormData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
      // Clear field error on change
      setErrors((prev) => {
        if (prev[field]) {
          const next = { ...prev };
          delete next[field];
          return next;
        }
        return prev;
      });
    },
    []
  );

  const handleNext = useCallback(() => {
    const stepErrors = validators[currentStep](data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});

    if (currentStep < TOTAL_STEPS - 1) {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
    } else {
      // Final submission
      console.log("🎉 Onboarding complete!", data);
      showToast("Account created successfully! Welcome to Resourcefull 🎉", "success");
      setIsSuccess(true);
    }
  }, [currentStep, data, showToast]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection("backward");
      setErrors({});
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const stepProps = {
    data,
    errors,
    onChange: handleChange,
    onNext: handleNext,
    onBack: handleBack,
  };

  const animationClass =
    direction === "forward" ? "step-enter-forward" : "step-enter-backward";

  return (
    <>
      {isSuccess && (
        <SuccessModal
          onClose={() => setIsSuccess(false)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Form panel inner - layout handles the split-screen wrapper */}
      <div className={styles.formInner}>
        {/* Header */}
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Create Your Account</h1>
          <p className={styles.formSubtitle}>
            Welcome to Resourcefull! Create your account
          </p>
        </div>

        {/* Active step */}
        <div key={currentStep} className={animationClass}>
          {currentStep === 0 && <PersonalInfoStep {...stepProps} />}
          {currentStep === 1 && <CredentialsStep {...stepProps} />}
          {currentStep === 2 && <ProfileSetupStep {...stepProps} />}
        </div>

        {/* Footer */}
        <div className={styles.formFooter}>
          <div className={styles.footerLeft}>
            <span className={styles.footerDot} />
            <a href="/privacy" className={styles.footerLink}>
              Privacy &amp; Terms
            </a>
          </div>
          <div className={styles.stepIndicator}>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === currentStep
                    ? styles.dotActive
                    : i < currentStep
                      ? styles.dotCompleted
                      : ""
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
