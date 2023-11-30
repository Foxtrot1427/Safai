import { useQuery } from '@tanstack/react-query';
import { Response, api } from './service-api';
import { HttpClient } from './service-axios';

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
