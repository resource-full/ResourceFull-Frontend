export interface PathwayBlock {
  type: "text" | "resource";
  order: number;
  name: string;
  shortDescription: string;
  resource?: string;
  _id?: string;
}

export interface Pathway {
  _id: string;
  id: string;
  name: string;
  description: string;
  blocks: PathwayBlock[];
  author: {
    _id: string;
    email: string;
    avatar: string;
    name: string;
    stats: {
      following: number;
      followers: number;
      totalCreated: number;
      totalSold: number;
      avgRelevancyScore: number;
    };
    id: string;
  };
  applicableLocation: string;
  experience: string;
  industry: string;
  isFree: boolean;
  price: number;
  currency: string;
  status: "draft" | "published";
  hub: {
    _id: string;
    name: string;
  };
  viewCount: number;
  rating: number;
  ratingCount: number;
  totalRatingSum: number;
  tags: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  blockCount: number;
  resourceCount: number;
}

export interface CreatePathwayPayload {
  name: string;
  description: string;
  blocks: {
    type: string;
    name: string;
    shortDescription: string;
    order: number;
    resource?: string;
  }[];
  applicableLocation: string;
  experience: string;
  industry: string;
  isFree: boolean;
  price: number;
  currency: string;
  tags: string[];
  hubId?: string;
}

export interface CreatePathwayResponse {
  success: boolean;
  data: Pathway;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface GetAllPathwaysResponse {
  success: boolean;
  data: {
    pathways: Pathway[];
    pagination: PaginationInfo;
  };
}

export interface GetSinglePathwayResponse {
  success: boolean;
  data: Pathway;
}
