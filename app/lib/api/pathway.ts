import { apiClient } from "./client";
import {
  CreatePathwayPayload,
  CreatePathwayResponse,
  GetAllPathwaysResponse,
  GetSinglePathwayResponse,
} from "../types/pathway";

export const pathwayAPI = {
  createPathway: async (payload: CreatePathwayPayload) => {
    const response = await apiClient.post<CreatePathwayResponse>(
      "/pathways",
      payload
    );
    return response.data;
  },

  getAllPathways: async (params?: Record<string, any>) => {
    const response = await apiClient.get<GetAllPathwaysResponse>("/pathways", {
      params,
    });
    return response.data;
  },

  getSinglePathway: async (id: string) => {
    const response = await apiClient.get<GetSinglePathwayResponse>(
      `/pathways/${id}`
    );
    return response.data;
  },

  getMyPathways: async (params?: Record<string, any>) => {
    const response = await apiClient.get<GetAllPathwaysResponse>(
      "/pathways/my-pathways",
      { params }
    );
    return response.data;
  },
};
