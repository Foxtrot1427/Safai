import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Response, api } from "./service-api"
import { HttpClient } from "./service-axios"
import { toastFail, toastSuccess } from "./service-toast"
import serverErrorResponse from "./service-error"

export interface ICategories {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    parent_id: any
    subCategories: SubCategory[]
  }
  
  export interface SubCategory {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
  }
export interface ICategoriesCreate {
    name: string
    description: string
  }
const getCategories = async () => {
    const response = await HttpClient.get<Response<ICategories[]>>(api.categories.get);
    return response;
}
export const useGetCategories = () => {
    return useQuery({
        queryKey: [api.categories.get],
        queryFn: getCategories,
        select: (response) => response?.data?.results,
    });
}

const createCategory = async (data: ICategoriesCreate) => {
    const response = await HttpClient.post<Response<ICategoriesCreate>>(api.categories.create, data);
    return response;
}
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
   return useMutation({
         mutationFn: createCategory,
         onSuccess: (response) => {
              queryClient.invalidateQueries({
                queryKey: [api.categories.get],
              });
              toastSuccess(response.data.toast || 'Category created');
         },
         onError: (error) => {
              const errorMsg = serverErrorResponse(error);
              toastFail(errorMsg || 'Failed to create category');
         },
    });
}
const deleteCategory = async (id: number) => {
    const response = await HttpClient.delete<Response<ICategories>>(`${api.categories.delete}/${id}`);
    return response;
}
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: [api.categories.get],
            });
            toastSuccess(response.data.toast || 'Category deleted');
        },
        onError: (error) => {
            const errorMsg = serverErrorResponse(error);
            toastFail(errorMsg || 'Failed to delete category');
        },
    });
}
const updateCategory = async({
    data,
    id,
  }: {
    data: ICategoriesCreate;
    id: number;
  }) => {
    const response = await HttpClient.patch<Response<ICategoriesCreate>>(`${api.categories.update}/${id}`, data);
    return response;
}
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [api.categories.update],
        mutationFn: updateCategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: [api.categories.get],
            });
            toastSuccess(response.data.toast || 'Category updated');
        },
        onError: (error) => {
            const errorMsg = serverErrorResponse(error);
            toastFail(errorMsg || 'Failed to update category');
        },
    });
}
const createSubCategory = async ({
    data,
    id,
  }: {
    data: ICategoriesCreate;
    id: number;
  }) => {
    const response = await HttpClient.post<Response<ICategoriesCreate>>(`${api.subCategories.create}/${id}`, data);
    return response;
}
export const useCreateSubCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSubCategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: [api.categories.get],
            });
            toastSuccess(response.data.toast || 'Subcategory created');
        },
        onError: (error) => {
            const errorMsg = serverErrorResponse(error);
            toastFail(errorMsg || 'Failed to create subcategory');
        },
    });
}
const deleteSubCategory = async (id: number) => {
    const response = await HttpClient.delete<Response<ICategories>>(`${api.subCategories.delete}/${id}`);
    return response;
}
export const useDeleteSubCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSubCategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: [api.categories.get],
            });
            toastSuccess(response.data.toast || 'Subcategory deleted');
        },
        onError: (error) => {
            const errorMsg = serverErrorResponse(error);
            toastFail(errorMsg || 'Failed to delete subcategory');
        },
    });
}