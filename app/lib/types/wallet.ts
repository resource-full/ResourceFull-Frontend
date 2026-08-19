export interface WalletOverview {
  availableBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  resourcesSold: number;
}

export interface GetWalletOverviewResponse {
  success: boolean;
  data: WalletOverview;
}

export interface Bank {
  code: string;
  name: string;
}

export interface GetBanksResponse {
  success: boolean;
  data: Bank[];
}

export interface WithdrawalAccount {
  _id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault: boolean;
}

export interface GetAccountsResponse {
  success: boolean;
  data: WithdrawalAccount[];
}

export interface Transaction {
  _id: string;
  type: 'sale' | 'withdrawal' | 'purchase'; // Depending on your backend types
  amount: number;
  status: 'successful' | 'failed' | 'pending' | 'Successful' | 'Failed' | 'Pending';
  description: string;
  reference: string;
  createdAt: string;
}

export interface GetTransactionsResponse {
  success: boolean;
  data: {
    transactions: Transaction[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface MonthlySummary {
  month: number;
  year: number;
  totalEarned: number;
  totalWithdrawn: number;
  salesCount: number;
}

export interface GetMonthlySummaryResponse {
  success: boolean;
  data: MonthlySummary;
}

export interface GenericWalletResponse {
  success: boolean;
  message?: string;
  data?: any;
}
