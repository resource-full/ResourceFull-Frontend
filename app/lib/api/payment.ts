import { apiClient } from "./client";
import { 
    InitializePaymentResponse, 
    VerifyPaymentResponse, 
    PurchaseStatusResponse 
} from "../types/payment";

export const paymentAPI = {
    initializePayment: async (type: 'Resource' | 'Pathway', itemId: string) => {
        const response = await apiClient.post<InitializePaymentResponse>(`/payments/initialize/${type}/${itemId}`);
        return response.data;
    },

    verifyPayment: async (reference: string) => {
        const response = await apiClient.get<VerifyPaymentResponse>(`/payments/verify/${reference}`);
        return response.data;
    },

    checkPurchaseStatus: async (type: 'Resource' | 'Pathway', itemId: string) => {
        const response = await apiClient.get<PurchaseStatusResponse>(`/payments/status/${type}/${itemId}`);
        return response.data;
    }
};
