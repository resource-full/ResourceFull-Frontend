export interface PaymentInitialization {
  authorizationUrl: string;
  reference: string;
}

export interface InitializePaymentResponse {
  success: boolean;
  data: PaymentInitialization;
}

export interface VerifyPaymentResponse {
  success: boolean;
  data: {
    status: 'success' | 'failed' | 'pending';
    amount: number;
    reference: string;
  };
}

export interface PurchaseStatusResponse {
  success: boolean;
  data: {
    hasPurchased: boolean;
    purchaseDate?: string;
  };
}
