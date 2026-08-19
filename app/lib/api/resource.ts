import { apiClient } from "./client";
import { CreateResourceResponse, GetAllResourcesResponse, GetSingleResourceResponse } from "../types/resource";

export const resourceAPI = {
    createResource: async (formData: FormData) => {
        // We use FormData for multipart/form-data upload
        const response = await apiClient.post<CreateResourceResponse>("/resources", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
    
    getAllResources: async (params?: Record<string, any>) => {
        const response = await apiClient.get<GetAllResourcesResponse>("/resources", {
            params
        });
        return response.data;
    },

    getSingleResource: async (id: string) => {
        const response = await apiClient.get<GetSingleResourceResponse>(`/resources/${id}`);
        return response.data;
    },

    updateResource: async (id: string, formData: FormData) => {
        const response = await apiClient.put(`/resources/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },

    deleteResource: async (id: string) => {
        const response = await apiClient.delete(`/resources/${id}`);
        return response.data;
    },

    addCollaborator: async (id: string, payload: any) => {
        const response = await apiClient.post(`/resources/${id}/collaborators`, payload);
        return response.data;
    },

    removeCollaborator: async (id: string, collaboratorId: string) => {
        const response = await apiClient.delete(`/resources/${id}/collaborators`, { data: { collaboratorId } });
        return response.data;
    },

    rateResource: async (id: string, rating: number) => {
        const response = await apiClient.post(`/resources/${id}/rate`, { rating });
        return response.data;
    },

    getMyResources: async (params?: Record<string, any>) => {
        const response = await apiClient.get(`/resources/my/resources`, { params });
        return response.data;
    },

    changeStatus: async (id: string, status: string) => {
        const response = await apiClient.patch(`/resources/${id}/status`, { status });
        return response.data;
    },

    shareResource: async (id: string, payload: any) => {
        const response = await apiClient.post(`/resources/${id}/share`, payload);
        return response.data;
    },

    removeShare: async (id: string, shareId: string) => {
        const response = await apiClient.delete(`/resources/${id}/share`, { data: { shareId } });
        return response.data;
    },

    downloadResource: async (id: string) => {
        const response = await apiClient.get(`/resources/${id}/download`);
        return response.data;
    }
};
