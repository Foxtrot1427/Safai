import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Response, api } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail, toastSuccess } from "./service-toast";
import serverErrorResponse from "./service-error";
import { GenericFormData } from "axios";

export interface IProduct {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  type: string;
  interest: string;
  admin: IAdmin;
  interests: IIntrests[];
}
export interface IIntrests {
  id: number;
  name: string;
  number: string;
  description: string;
  closed: boolean;
}
export interface IProductCreate {
  name: string;
  image: FileList | null;
  price: string;
}

interface IAdmin {
  id: number;
  name: string;
  email: string;
  address: string;
  password: string;
}

const getAllProducts = async () => {
  const response = await HttpClient.get<Response<IProduct[]>>(api.products.get);
  return response;
};

export const useProducts = () => {
  return useQuery({
    queryKey: [api.products.get],
    queryFn: getAllProducts,
    select: response => response.data.results,
  });
};

const createProduct = async (data: GenericFormData) => {
  const response = await HttpClient.post<Response<IProductCreate>>(
    api.products.create,
    data,
  );
  return response;
};
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.products.create],
    mutationFn: createProduct,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.products.get],
      });
      toastSuccess(response.data.toast || "Product created");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to create product");
    },
  });
};

const deleteProduct = async (id: number) => {
  const response = await HttpClient.delete<Response<IProduct>>(
    `${api.products.delete}${id}`,
  );
  return response;
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.products.delete],
    mutationFn: deleteProduct,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.products.get],
      });
      toastSuccess(response.data.toast || "Product deleted");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to Delete product");
    },
  });
};
