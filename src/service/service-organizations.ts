import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Response, api } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail, toastSuccess } from "./service-toast";
import serverErrorResponse from "./service-error";
import { GenericFormData } from "axios";

export interface IOrganizations {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  image: string;
  organizationDonation: OrganizationDonation[];
  contribution: number;
  total: number;
}

export interface IOrganization {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  image: string;
}

export interface OrganizationDonation {
  id: string;
  createdAt: string;
  updatedAt: string;
  donation: number;
  categories: Categories;
  unit: string;
  date: string;
}
export interface IOrganizationCreate {
  name: string;
  image: FileList | null;
  description: string;
}

export interface Categories {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  subCategories: SubCategories[];
}
export interface SubCategories {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}
export interface IOrgDonation {
  donation: number;
  categories: number;
  organizations: number;
}

const getAllOrganizations = async () => {
  const response = await HttpClient.get<Response<IOrganizations[]>>(
    api.organization.get,
  );
  return response;
};
export const useGetAllOrganizations = () => {
  return useQuery({
    queryKey: [api.organization.get],
    queryFn: getAllOrganizations,
    select: response => response?.data?.results,
  });
};
const getOneOrganization = async (id: string) => {
  const response = await HttpClient.get<Response<IOrganizations>>(
    `${api.organization.get}/${id}`,
  );
  return response;
};
export const useGetOneOrganization = (id: string) => {
  return useQuery({
    queryKey: [api.organization.get, id],
    queryFn: () => getOneOrganization(id),
    enabled: !!id,
    select: response => response?.data?.results,
  });
};
const oneOrganizationDonation = async (id: string) => {
  const response = await HttpClient.get<Response<OrganizationDonation[]>>(
    `${api.organization.donation}/${id}`,
  );
  return response;
};
export const useOneOrganizationDonation = (id: string) => {
  return useQuery({
    queryKey: [api.organization.donation, id],
    queryFn: () => oneOrganizationDonation(id),
    enabled: !!id,
    select: response => response?.data?.results,
  });
};

const createOrganization = async (data: GenericFormData) => {
  const response = await HttpClient.post<Response<IOrganizationCreate>>(
    api.organization.create,
    data,
  );
  return response;
};
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.organization.create],
    mutationFn: createOrganization,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.organization.get],
      });
      toastSuccess(response.data.toast || "Organization created");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to create organization");
    },
  });
};

const deleteOrganization = async (id: number) => {
  const response = await HttpClient.delete<Response<IOrganization[]>>(
    `${api.organization.delete}/${id}`,
  );
  return response;
};
export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.organization.delete],
    mutationFn: deleteOrganization,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.organization.get],
      });
      toastSuccess(response.data.toast || "Organization deleted");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to delete organization");
    },
  });
};
const updateOrganization = async ({
  data,
  id,
}: {
  data: GenericFormData;
  id: number;
}) => {
  const response = await HttpClient.patch<Response<IOrganizationCreate>>(
    `${api.organization.update}/${id}`,
    data,
  );
  return response;
};
export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrganization,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.organization.get],
      });
      toastSuccess(response.data.toast || "Organization updated");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to update organization");
    },
  });
};
const submitDonation = async (data: IOrgDonation) => {
  const response = await HttpClient.post<Response<IOrgDonation>>(
    api.organization.donation,
    data,
  );
  return response;
};
export const useSubmitDonation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.organization.donation],
    mutationFn: submitDonation,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.organization.get],
      });
      toastSuccess(response.data.toast || "Donation submitted");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to submit donation");
    },
  });
};
const deleteDonation = async (id: number) => {
  const response = await HttpClient.delete<Response<IOrganization[]>>(
    `${api.organization.donation}/${id}`,
  );
  return response;
};
export const useDeleteDonation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.organization.donation],
    mutationFn: deleteDonation,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.organization.get],
      });
      toastSuccess(response.data.toast || "Donation deleted");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to delete donation");
    },
  });
};
