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
    }
};
