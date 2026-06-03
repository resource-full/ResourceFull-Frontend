import type { StepProps } from "@/app/lib/types/onboarding";
import { Select, Button } from "@/app/components/ui";
import {
  SKILLS_OPTIONS,
  EXPERIENCE_OPTIONS,
  COUNTRIES,
  GOALS_OPTIONS,
} from "@/app/lib/constants/onboarding";

export default function ProfileSetupStep({
  data,
  errors,
  onChange,
  onNext,
  onBack,
}: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <Select
        id="skills"
        label="Skills"
        placeholder="Select your skill"
        options={SKILLS_OPTIONS}
        value={data.skills}
        onChange={(v) => onChange("skills", v)}
        error={errors.skills}
      />

      <Select
        id="experience"
        label="Experience"
        placeholder="How long have you been in your field?"
        options={EXPERIENCE_OPTIONS}
        value={data.experience}
        onChange={(v) => onChange("experience", v)}
        error={errors.experience}
      />

      <Select
        id="location"
        label="Location"
        placeholder="Select your country"
        options={COUNTRIES}
        value={data.location}
        onChange={(v) => onChange("location", v)}
        error={errors.location}
        searchable
      />

      <Select
        id="goals"
        label="Goals"
        placeholder="Select your goal"
        options={GOALS_OPTIONS}
        value={data.goals}
        onChange={(v) => onChange("goals", v)}
        error={errors.goals}
      />

      <div className="flex gap-3 pt-2">
        <Button
          id="step3-back"
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          id="step3-submit"
          type="button"
          size="lg"
          fullWidth
          onClick={onNext}
          disabled={!data.skills || !data.experience || !data.location || !data.goals}
        >
          Create Account
        </Button>
      </div>

      <p className="text-center text-sm" style={{ color: "var(--color-text-secondary)" }}>
        Already have an account?{" "}
        <a href="/login" className="font-semibold">
          Log in
        </a>
      </p>
    </div>
  );
}
