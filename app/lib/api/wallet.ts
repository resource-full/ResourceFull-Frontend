import { apiClient } from "./client";
import { 
    GetWalletOverviewResponse, 
    GetBanksResponse, 
    GetAccountsResponse, 
    GetTransactionsResponse,
    GetMonthlySummaryResponse,
    GenericWalletResponse
} from "../types/wallet";

export const walletAPI = {
    getOverview: async () => {
        const response = await apiClient.get<GetWalletOverviewResponse>("/wallet");
        return response.data;
    },

    getBanksList: async () => {
        const response = await apiClient.get<GetBanksResponse>("/wallet/banks");
        return response.data;
    },

    addWithdrawalAccount: async (data: { bankCode: string; accountNumber: string; accountName: string }) => {
        const response = await apiClient.post<GenericWalletResponse>("/wallet/accounts", data);
        return response.data;
    },

    getAccounts: async () => {
        const response = await apiClient.get<GetAccountsResponse>("/wallet/accounts");
        return response.data;
    },

    setDefaultAccount: async (accountId: string) => {
        const response = await apiClient.put<GenericWalletResponse>(`/wallet/accounts/${accountId}/default`);
        return response.data;
    },

    requestWithdrawal: async (data: { amount: number; accountId: string }) => {
        const response = await apiClient.post<GenericWalletResponse>("/wallet/withdraw", data);
        return response.data;
    },

    getTransactions: async (params?: { page?: number; limit?: number }) => {
        const response = await apiClient.get<GetTransactionsResponse>("/wallet/transactions", { params });
        return response.data;
    },

    getMonthlySummary: async (year: number, month: number) => {
        const response = await apiClient.get<GetMonthlySummaryResponse>(`/wallet/transactions/summary/${year}/${month}`);
        return response.data;
    }
};
