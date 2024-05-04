import { useQuery } from "@tanstack/react-query"
import { Response, api } from "./service-api"
import { HttpClient } from "./service-axios"

export interface ICategories {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    parent_id: any
  }
const getCategories = async () => {
    const response = await HttpClient.get<Response<ICategories[]>>(api.categories.get);
    return response;
}
export const useGetCategories = () => {
    return useQuery({
        queryKey: [api.categories.get],
        queryFn: getCategories,
        select: (response) => response?.data?.results,
    });
}