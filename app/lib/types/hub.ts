export interface Hub {
  _id: string;
  name: string;
  description: string;
  industry: string;
  applicableLocation: string;
  experience: string;
  status?: 'draft' | 'public' | 'private';
  resources?: string[];
  pathways?: string[];
  owner?: {
    _id: string;
    email: string;
    name?: string;
    avatar?: string;
  };
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface CreateHubRequest {
  name: string;
  description: string;
  industry: string;
  applicableLocation: string;
  experience: string;
  resources?: string[]; // array of resourceIds
  pathways?: string[]; // array of pathwayIds
}

export interface CreateHubResponse {
  success: boolean;
  message?: string;
  data?: Hub;
}

export interface GetAllHubsResponse {
  success: boolean;
  message?: string;
  data?: {
    hubs: Hub[];
    pagination: PaginationInfo;
  };
}

export interface GetSingleHubResponse {
  success: boolean;
  message?: string;
  data?: Hub;
}
