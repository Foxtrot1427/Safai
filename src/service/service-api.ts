export const api = {
  admin: {
    getDonations: "/donations",
  },
  login: "admin/login",
  register: "admin/register",
  products: {
    get: "products/get",
    create: "products/create",
    delete: "products/",
    update: "products",
  },
  interest: {
    get: "/interests",
    create: "/interests/:productId",
    delete: "/interests/:id",
  },
  donation: {
    get: "/donations",
    create: "/donations",
    delete: "/donations/:id",
    update: "/donations/:id",
  },
  organization: {
    get: "/organization",
    create: "/organization",
    delete: "/organization",
    update: "/organization",
    donation: "/organization-donation",
  },
  categories: {
    get: "/category",
    create: "/category",
    delete: "/category",
    update: "/category",
  },
  subCategories: {
    get: "/subcategory",
    create: "/subcategory",
    delete: "/subcategory",
  },
  blogs: {
    get: "/blogs",
    create: "/blogs",
    delete: "/blogs",
    update: "/blogs",
  },
  stats: {
    get: "/dashboard",
    update: "/dashboard",
  },
};

export interface Response<T> {
  status: string;
  description: string;
  results: T;
  toast: string;
  cookies: boolean;
}
