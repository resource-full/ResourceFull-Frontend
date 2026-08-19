export interface Comment {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  comment: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InteractionStats {
  likes: number;
  saves: number;
  comments: number;
  shares: number;
}

export interface GenericInteractionResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface GetCommentsResponse {
  success: boolean;
  data: {
    comments: Comment[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface GetInteractionStatsResponse {
  success: boolean;
  data: InteractionStats;
}

export interface GetUserInteractionsResponse {
  success: boolean;
  data: any[]; // The shape of user interactions array
}
