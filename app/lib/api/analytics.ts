import { apiClient } from "./client";
import { 
    GetAnalyticsStatsResponse, 
    GetPerformanceResponse, 
    GetProductsPerformanceResponse 
} from "../types/analytics";

export const analyticsAPI = {
    getStats: async () => {
        const response = await apiClient.get<GetAnalyticsStatsResponse>("/analytics/stats");
        return response.data;
    },

    getPerformance: async () => {
        const response = await apiClient.get<GetPerformanceResponse>("/analytics/performance");
        return response.data;
    },

    getProducts: async () => {
        const response = await apiClient.get<GetProductsPerformanceResponse>("/analytics/products");
        return response.data;
    },

    exportPDF: async () => {
        const response = await apiClient.get("/analytics/export/pdf", { responseType: 'blob' });
        return response.data;
    },

    exportPNG: async () => {
        const response = await apiClient.get("/analytics/export/png", { responseType: 'blob' });
        return response.data;
    }
};
