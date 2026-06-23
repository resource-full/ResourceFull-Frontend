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
        const response = await apiClient.post("/auth/forgot-password", { email });
        return response.data;
    },
};
