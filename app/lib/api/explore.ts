import { apiClient } from "./client";
import { GetExploreDataResponse } from "../types/explore";

export const exploreAPI = {
    getExploreData: async (params?: Record<string, any>) => {
        const response = await apiClient.get<GetExploreDataResponse>("/explore/", { params });
        return response.data;
    }
};
