export const api = {
  admin:{
    getDonations: '/donations',
  },
  login: 'admin/login',
  register: 'admin/register',
  
};

export interface Response<T> {
  status: string;
  description: string;
  results: T;
  toast: string;
  cookies: boolean;
}
