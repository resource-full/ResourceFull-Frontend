import type { StepProps } from "@/app/lib/types/onboarding";
import { Input, PasswordInput, Button } from "@/app/components/ui";

export default function CredentialsStep({
  data,
  errors,
  onChange,
  onNext,
  onBack,
}: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="name@example.com"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
        autoFocus
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Must be at least 8 characters"
        value={data.password}
        onChange={(e) => onChange("password", e.target.value)}
        error={errors.password}
      />

      <PasswordInput
        id="confirm-password"
        label="Confirm Password"
        placeholder="Must be at least 8 characters"
        value={data.confirmPassword}
        onChange={(e) => onChange("confirmPassword", e.target.value)}
        error={errors.confirmPassword}
      />

      <div className="flex gap-3 pt-2">
        <Button
          id="step2-back"
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          id="step2-next"
          type="button"
          size="lg"
          fullWidth
          onClick={onNext}
          disabled={!data.email || !data.password || !data.confirmPassword}
        >
          Next
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
