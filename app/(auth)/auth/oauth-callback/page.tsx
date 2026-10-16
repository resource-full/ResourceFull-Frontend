"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { authAPI } from "@/app/lib/api/auth";
import styles from "./page.module.css";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithTokens } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      setError("Sign-in did not complete. Please try again.");
      return;
    }

    (async () => {
      try {
        await loginWithTokens(accessToken, refreshToken);

        // Route based on onboarding completion (fall back to dashboard if check fails)
        let redirectTo = "/dashboard";
        try {
          const statusRes = await authAPI.getOnboardingStatus();
          const statusData = statusRes?.data;
          const completed =
            statusData?.completed ??
            statusData?.onboardingCompleted ??
            statusData?.isOnboarded;
          if (!completed) {
            const currentStep =
              typeof statusData?.currentStep === "number" ? statusData.currentStep : 1;
            redirectTo = currentStep >= 2 ? "/onboarding/goals" : "/onboarding/profile";
          }
        } catch {
          // Status check failed; default to dashboard
        }

        router.replace(redirectTo);
      } catch (err) {
        console.error("OAuth sign-in failed:", err);
        setError("We couldn't complete your sign-in. Please try again.");
      }
    })();
  }, [searchParams, loginWithTokens, router]);

  return (
    <div className={styles.container}>
      {error ? (
        <>
          <p className={styles.errorText}>{error}</p>
          <Link href="/login" className={styles.link}>Back to Login</Link>
        </>
      ) : (
        <>
          <div className={styles.spinner}></div>
          <p className={styles.text}>Finishing sign-in...</p>
        </>
      )}
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div className={styles.spinner}></div>
          <p className={styles.text}>Loading...</p>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
