import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response, api } from './service-api';
import { HttpClient } from './service-axios';
import { toastFail, toastSuccess } from './service-toast';
import serverErrorResponse from './service-error';
import { generatePath } from 'react-router-dom';

interface IInterestRequest {
  name: string;
  number: string;
  description: string;
}

interface IInterestResponse {
  name: string;
  number: string;
  description: string;
  product: string;
  id: number;
  closed: boolean;
}

const createInterest = async ({
  productId,
  data,
}: {
  productId: number;
  data: IInterestRequest;
}) => {
  const response = await HttpClient.post<Response<IInterestResponse>>(
    generatePath(api.interest.create, { productId }),
    data,
  );
  return response;
};

export const useCreateInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInterest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [api.interest.get],
      });
      toastSuccess(response.data.toast || 'Interest marked');
    },
    onError: (error) => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || 'Failed to mark interest');
    },
  });
};
