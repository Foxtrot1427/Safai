import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, Response } from "./service-api";
import { HttpClient } from "./service-axios";
import serverErrorResponse from "./service-error";
import { toastFail, toastSuccess } from "./service-toast";
import { IStatsForm } from "@rsces/pages/Admin/Stats";

export interface IStats {
  dashboard: Dashboard[];
  totalDonation: number;
  categories: IDashStats[];
}
export interface IDashStats {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  parent_id: number;
  donation: number;
}

export interface Dashboard {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  quantity: number;
  unit: string;
  order: number;
}
const getAllStats = async () => {
  const response = await HttpClient.get<Response<IStats>>(api.stats.get);
  return response;
};
export const useStats = () => {
  return useQuery({
    queryKey: [api.stats.get],
    queryFn: getAllStats,
    select: response => response.data.results,
  });
};
const updateStats = async ({ data, id }: { data: IStatsForm; id: number }) => {
  const response = await HttpClient.patch<Response<IStats>>(
    `${api.stats.update}/${id}`,
    data,
  );
  return response;
};
export const useUpdateStats = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.stats.update],
    mutationFn: updateStats,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.stats.get],
      });
      toastSuccess(response.data.toast || "Stats updated");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to update stats");
    },
  });
};
