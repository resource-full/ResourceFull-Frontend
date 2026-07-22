export interface Hub {
  _id: string;
  name: string;
  description: string;
  industry: string;
  applicableLocation: string;
  experience: string;
  resources?: string[];
  pathways?: string[];
  author?: {
    _id: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
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
    total: number;
    pages: number;
    currentPage: number;
  };
}

export interface GetSingleHubResponse {
  success: boolean;
  message?: string;
  data?: Hub;
}
