import { useQuery } from "@tanstack/react-query";
import { Response, api } from "./service-api";
import { HttpClient } from "./service-axios";

export interface IOrganization {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    description: string
    image: string
    organizationDonation: OrganizationDonation[]
  }
  
  export interface OrganizationDonation {
    id: string
    createdAt: string
    updatedAt: string
    donation: number
    categories: Categories
  }
  
  export interface Categories {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    description: string
  }

const getAllOrganizations = async()  => {
    const response = await HttpClient.get<Response<IOrganization[]>>(api.organization.get);
    return response;
};
export const useGetAllOrganizations = () => {
    return useQuery({
        queryKey: [api.organization.get],
        queryFn: getAllOrganizations,
        select: (response) => response?.data?.results,
    });
}
