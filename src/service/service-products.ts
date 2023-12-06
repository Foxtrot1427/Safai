import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Response, api } from './service-api';
import { HttpClient } from './service-axios';
import { toastFail, toastSuccess } from './service-toast';
import serverErrorResponse from './service-error';

export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: string;
  interest: string;
  admin: IAdmin;
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
    select: (response) => response.data.results,
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
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [api.products.get],
      });
      toastSuccess(response.data.toast || 'Product deleted');
    },
    onError: (error) => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || 'Failed to Delete product');
    },
  });
};
