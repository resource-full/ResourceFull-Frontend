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

  updatePathway: async (id: string, payload: any) => {
    const response = await apiClient.put(`/pathways/${id}`, payload);
    return response.data;
  },

  deletePathway: async (id: string) => {
    const response = await apiClient.delete(`/pathways/${id}`);
    return response.data;
  },

  changeStatus: async (id: string, status: string) => {
    const response = await apiClient.patch(`/pathways/${id}/status`, { status });
    return response.data;
  },

  addBlock: async (id: string, block: any) => {
    const response = await apiClient.post(`/pathways/${id}/blocks`, block);
    return response.data;
  },

  removeBlock: async (id: string, blockId: string) => {
    const response = await apiClient.delete(`/pathways/${id}/blocks/${blockId}`);
    return response.data;
  },

  reorderBlocks: async (id: string, blocks: string[]) => {
    const response = await apiClient.put(`/pathways/${id}/blocks/reorder`, { blocks });
    return response.data;
  }
};
