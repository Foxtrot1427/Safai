import { Response, api } from '@rsces/service/service-api';
import { HttpClient } from '@rsces/service/service-axios';
import { useQuery } from '@tanstack/react-query';

export interface IGetDonationsResponse {
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
  return await HttpClient.get<Response<IGetDonationsResponse[]>>(
    api.admin.getDonations,
  );
};
export const useGetDonations = () => {
  return useQuery({
    queryKey: ['donations'],
    queryFn: getDonations,
    select: (response) => response.data.results,
  });
};
