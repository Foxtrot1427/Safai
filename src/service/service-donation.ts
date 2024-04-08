import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Response, api } from './service-api';
import { HttpClient } from './service-axios';
import { toastFail, toastSuccess } from './service-toast';
import serverErrorResponse from './service-error';
import { GenericFormData } from 'axios';
import { IDonation } from '@rsces/pages/Admin/donations/interface';
import { generatePath } from 'react-router-dom';

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

const deleteDonation = async (id: number) => {
  const response = await HttpClient.delete<Response<IDonation>>(
    generatePath(api.donation.delete, { id }),
  );
  return response;
};

export const useDeleteDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDonation,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [api.donation.get],
      });
      toastSuccess(response.data.toast || 'Donation deleted');
    },
    onError: (error) => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || 'Failed to delete donation');
    },
  });
};
const updateDonation = async ({data, id}:{data: {isAccepted: boolean}, id: number}) => {
  const response = await HttpClient.patch<Response<IDonation>>(
    generatePath(api.donation.update, { id }),
    data,
    // {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // },
  );
  return response;
}
export const useUpdateDonation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDonation,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [api.donation.get],
      });
      toastSuccess(response.data.toast || 'Donation updated');
    },
    onError: (error) => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || 'Failed to update donation');
    },
  });
}