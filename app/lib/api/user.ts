import { apiClient } from "./client";
import { GetUserProfileResponse, UpdateUserProfilePayload, UpdateUserProfileResponse } from "../types/user";

export const userAPI = {
    getUserProfile: async () => {
        const response = await apiClient.get<GetUserProfileResponse>("/users/profile");
        return response.data;
    },
    updateUserProfile: async (data: UpdateUserProfilePayload) => {
        const response = await apiClient.put<UpdateUserProfileResponse>("/users/profile", data);
        return response.data;
    },

    getPublicProfile: async (id: string) => {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    },

    followUser: async (id: string) => {
        const response = await apiClient.post(`/users/follow/${id}`);
        return response.data;
    },

    unfollowUser: async (id: string) => {
        const response = await apiClient.post(`/users/unfollow/${id}`);
        return response.data;
    },

    searchUsers: async (query: string, params?: Record<string, any>) => {
        const response = await apiClient.get("/users/search", { params: { q: query, ...params } });
        return response.data;
    },

    getCountries: async () => {
        const response = await apiClient.get("/users/countries");
        return response.data;
    },

    getExperienceLevels: async () => {
        const response = await apiClient.get("/users/experience-levels");
        return response.data;
    },

    getGoalReviewTimelines: async () => {
        const response = await apiClient.get("/users/goal-review-timelines");
        return response.data;
    },

    getIndustries: async () => {
        const response = await apiClient.get("/users/industries");
        return response.data;
    }
};
