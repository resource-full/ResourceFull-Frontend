import { apiClient } from "./client";
import { 
    GenericInteractionResponse, 
    GetCommentsResponse, 
    GetInteractionStatsResponse, 
    GetUserInteractionsResponse 
} from "../types/interaction";

export const interactionAPI = {
    likeResource: async (resourceId: string) => {
        const response = await apiClient.post<GenericInteractionResponse>(`/interactions/resources/${resourceId}/like`);
        return response.data;
    },

    saveResource: async (resourceId: string) => {
        const response = await apiClient.post<GenericInteractionResponse>(`/interactions/resources/${resourceId}/save`);
        return response.data;
    },

    addComment: async (resourceId: string, content: string) => {
        const response = await apiClient.post<GenericInteractionResponse>(`/interactions/resources/${resourceId}/comments`, { comment: content });
        return response.data;
    },

    getComments: async (resourceId: string, params?: { page?: number; limit?: number }) => {
        const response = await apiClient.get<GetCommentsResponse>(`/interactions/resources/${resourceId}/comments`, { params });
        return response.data;
    },

    getInteractionStats: async (resourceId: string) => {
        const response = await apiClient.get<GetInteractionStatsResponse>(`/interactions/resources/${resourceId}/stats`);
        return response.data;
    },

    deleteComment: async (commentId: string) => {
        const response = await apiClient.delete<GenericInteractionResponse>(`/interactions/comments/${commentId}`);
        return response.data;
    },

    getUserInteractions: async (type: 'like' | 'save' = 'like') => {
        const response = await apiClient.get<GetUserInteractionsResponse>(`/interactions/user/me`, { params: { type } });
        return response.data;
    }
};
