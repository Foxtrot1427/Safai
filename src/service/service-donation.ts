import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Response, api } from './service-api';
import { HttpClient } from './service-axios';
import { toastFail, toastSuccess } from './service-toast';
import serverErrorResponse from './service-error';
import { GenericFormData } from 'axios';

interface IDonation {
  id: number;
  name: string;
  number: string;
  itemName: string;
  image: string;
  pickUpDate: string;
  pickUpTime: string;
  created_at: string;
  updated_at: string;
  description: string;
}

const getDonations = async () => {
  const response = await HttpClient.get<Response<IDonation[]>>(
    api.donation.get,
  );
  return response;
};

export const useDonations = () => {
  return useQuery({
    queryKey: [api.donation.get],
    queryFn: getDonations,
    select: (response) => response.data.results,
  });
};

const createDonation = async (data: GenericFormData) => {
  const response = await HttpClient.post<Response<IDonation>>(
    api.donation.create,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
};

export const useCreateDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDonation,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [api.donation.get],
      });
      toastSuccess(response.data.toast || 'Donation created');
    },
    onError: (error) => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || 'Failed to create donation');
    },
  });
};
