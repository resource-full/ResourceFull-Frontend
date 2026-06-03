import type { StepProps } from "@/app/lib/types/onboarding";
import { Input } from "@/app/components/ui";
import { Button } from "@/app/components/ui";

export default function PersonalInfoStep({
  data,
  errors,
  onChange,
  onNext,
}: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <Input
        id="first-name"
        label="First Name"
        placeholder="Enter First Name"
        value={data.firstName}
        onChange={(e) => onChange("firstName", e.target.value)}
        error={errors.firstName}
        autoFocus
      />

      <Input
        id="last-name"
        label="Last Name"
        placeholder="Enter Last Name"
        value={data.lastName}
        onChange={(e) => onChange("lastName", e.target.value)}
        error={errors.lastName}
      />

      <Input
        id="username"
        label="Username"
        placeholder="Use alphanumeric characters"
        value={data.username}
        onChange={(e) => onChange("username", e.target.value)}
        error={errors.username}
      />

      <div className="pt-2">
        <Button
          id="step1-next"
          type="button"
          fullWidth
          size="lg"
          onClick={onNext}
          disabled={!data.firstName || !data.lastName || !data.username}
        >
          Next
        </Button>
      </div>

      <p className="text-center text-sm" style={{ color: "var(--color-text-secondary)" }}>
        Already have an account?{" "}
        <a href="/login" className="font-semibold">
          Log In
        </a>
      </p>
    </div>
  );
}
