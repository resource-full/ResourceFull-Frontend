"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI, User, LoginPayload, RegisterPayload } from "@/app/lib/api/auth";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const initializeAuth = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const response = await authAPI.getCurrentUser();
                if (response.success) {
                    setUser(response.data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch current user", error);
            // If token is invalid, clear storage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    const login = async (payload: LoginPayload) => {
        const response = await authAPI.login(payload);
        if (response.success) {
            const { accessToken, refreshToken, user } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userId", user._id || user.id);
            localStorage.setItem("userEmail", user.email);
            setUser(user);
        }
    };

    const register = async (payload: RegisterPayload) => {
        const response = await authAPI.register(payload);
        if (response.success) {
            const { accessToken, refreshToken, user } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userId", user._id || user.id);
            localStorage.setItem("userEmail", user.email);
            setUser(user);
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
