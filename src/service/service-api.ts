export const api = {
  login: 'admin/login',
  register: 'admin/register',
  products: {
    get: 'products/get',
    create: 'products/create',
    delete: 'products/:id',
    update: 'products/:id',
  },
  interest: {
    get: '/interests',
    create: '/interests/:productId',
    delete: '/interests/:id',
  },
  donation: {
    get: '/donations',
    create: '/donations',
    delete: '/donations/:id',
  },
};

export interface Response<T> {
  status: string;
  description: string;
  results: T;
  toast: string;
  cookies: boolean;
}
