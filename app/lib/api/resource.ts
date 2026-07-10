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
    }
};
