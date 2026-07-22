import { apiClient } from "./client";
import { GetUserProfileResponse } from "../types/user";

export const userAPI = {
    getUserProfile: async () => {
        const response = await apiClient.get<GetUserProfileResponse>("/users/profile");
        return response.data;
    }
};
