export interface ResourceFile {
  url: string;
  format: string;
  size: number;
}

export interface Resource {
  _id: string;
  id: string;
  name: string;
  description: string;
  resourceFile: ResourceFile;
  coverPhoto: string;
  status: 'draft' | 'published';
  owner: {
    name: string;
    avatar: string;
  };
  applicableLocation: string;
  experience: string;
  industry: string;
  isFree: boolean;
  price: number;
  currency: string;
  hub: string;
  viewCount: number;
  downloadCount: number;
  shareCount: number;
  peerRatings: number;
  ratingCount: number;
  totalRatingSum: number;
  verificationStatus: boolean;
  confidenceScore: number;
  tags: string[];
  version: number;
  isDeleted: boolean;
  collaborators: any[];
  sharedWith: any[];
  createdAt: string;
  updatedAt: string;
  averageRating: number;
}

export interface CreateResourceResponse {
  success: boolean;
  data: Resource;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface GetAllResourcesResponse {
  success: boolean;
  data: {
    resources: Resource[];
    pagination: PaginationInfo;
  };
}

export interface GetSingleResourceResponse {
  success: boolean;
  data: Resource;
}
