import { apiClient } from "./client";
import { GetNotificationsResponse, GenericNotificationResponse } from "../types/notification";

export const notificationAPI = {
    getNotifications: async (params?: { page?: number; limit?: number; isRead?: boolean }) => {
        const response = await apiClient.get<GetNotificationsResponse>("/notifications", { params });
        return response.data;
    },

    markAsRead: async (id: string) => {
        const response = await apiClient.patch<GenericNotificationResponse>(`/notifications/${id}/read`);
        return response.data;
    },

    markAllAsRead: async () => {
        const response = await apiClient.patch<GenericNotificationResponse>("/notifications/read-all");
        return response.data;
    }
};
