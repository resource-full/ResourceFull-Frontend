import { apiClient } from "./client";
import { CreateHubRequest, CreateHubResponse, GetAllHubsResponse, GetSingleHubResponse } from "../types/hub";

export const hubAPI = {
    createHub: async (data: CreateHubRequest) => {
        const response = await apiClient.post<CreateHubResponse>("/hubs", data);
        return response.data;
    },
    
    getAllHubs: async (params?: Record<string, any>) => {
        const response = await apiClient.get<GetAllHubsResponse>("/hubs", { params });
        return response.data;
    },

    getSingleHub: async (id: string) => {
        const response = await apiClient.get<GetSingleHubResponse>(`/hubs/${id}`);
        return response.data;
    },

    updateHub: async (id: string, data: Partial<CreateHubRequest>) => {
        const response = await apiClient.put<CreateHubResponse>(`/hubs/${id}`, data);
        return response.data;
    },

    deleteHub: async (id: string) => {
        const response = await apiClient.delete(`/hubs/${id}`);
        return response.data;
    }
};
