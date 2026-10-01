import { apiClient } from "./client";

export interface User {
    id: string; // The backend returns _id, but we'll map it to id if necessary, or just use _id
    _id?: string;
    name: string;
    email: string;
    role?: string;
    createdAt?: string;
    [key: string]: any;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        user: User;
    };
}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
    data?: {
        message?: string;
        resetToken?: string;
    };
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
    data?: {
        message?: string;
    };
}

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

export interface LoginPayload {
    email: string;
    password?: string;
}

export interface OnboardingStatusResponse {
    success: boolean;
    message?: string;
    data?: {
        completed?: boolean;
        onboardingCompleted?: boolean;
        isOnboarded?: boolean;
        currentStep?: number;
        steps?: Record<string, boolean> | string[];
        [key: string]: any;
    };
}

export interface OnboardingSaveResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export const authAPI = {
    register: async (payload: RegisterPayload) => {
        const response = await apiClient.post<AuthResponse>("/auth/register", payload);
        return response.data;
    },

    login: async (payload: LoginPayload) => {
        const response = await apiClient.post<AuthResponse>("/auth/login", payload);
        return response.data;
    },

    getCurrentUser: async () => {
        // According to Postman, returns success, data (User)
        const response = await apiClient.get<{ success: boolean; data: User }>("/auth/me");
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post("/auth/logout");
        return response.data;
    },

    forgotPassword: async (email: string) => {
        const response = await apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", { email });
        return response.data;
    },

    resetPassword: async (payload: { token: string; password: string }) => {
        const response = await apiClient.post<ResetPasswordResponse>("/auth/reset-password", payload);
        return response.data;
    },

    changePassword: async (payload: { oldPassword?: string; newPassword?: string }) => {
        const response = await apiClient.post("/auth/change-password", payload);
        return response.data;
    },

    getOnboardingStatus: async (): Promise<OnboardingStatusResponse> => {
        const response = await apiClient.get<OnboardingStatusResponse>("/auth/onboarding/status");
        return response.data;
    },

    saveOnboardingStep: async (payload: any): Promise<OnboardingSaveResponse> => {
        const response = await apiClient.post<OnboardingSaveResponse>("/auth/onboarding", payload);
        return response.data;
    },

    skipOnboardingStep: async (step: number): Promise<OnboardingSaveResponse> => {
        const response = await apiClient.post<OnboardingSaveResponse>(`/auth/onboarding/skip/${step}`);
        return response.data;
    },
};

/** Extract a human-readable message from an axios-like auth error. */
export function getAuthErrorMessage(err: any, fallback: string): string {
    return (
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.message ||
        err?.message ||
        fallback
    );
}
