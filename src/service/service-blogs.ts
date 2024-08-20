import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Response, api } from "./service-api";
import { HttpClient } from "./service-axios";
import { GenericFormData } from "axios";
import { toastFail, toastSuccess } from "./service-toast";
import serverErrorResponse from "./service-error";
export interface IBlogs {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export interface IBlogsCreate {
  title: string;
  image: FileList | null;
  description: string;
  date: string;
}
const getBlogs = async () => {
  const response = await HttpClient.get<Response<IBlogs[]>>(api.blogs.get);
  return response;
};
export const useBlogs = () => {
  return useQuery({
    queryKey: [api.blogs.get],
    queryFn: getBlogs,
    select: response => response?.data?.results,
  });
};

const createBlogs = async (data: GenericFormData) => {
  const response = await HttpClient.post<Response<IBlogs>>(
    api.blogs.create,
    data,
    // {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // },
  );
  return response;
};

export const useCreateBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlogs,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.blogs.get],
      });
      toastSuccess(response.data.toast || "Blogs created");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to create Blogs");
    },
  });
};
const deleteBlogs = async (id: number) => {
  const response = await HttpClient.delete<Response<IBlogs>>(
    `${api.blogs.delete}/${id}`,
  );
  return response;
};
export const useDeleteBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogs,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.blogs.get],
      });
      toastSuccess(response.data.toast || "Blogs deleted");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to delete Blogs");
    },
  });
};
const editBlogs = async ({
  data,
  id,
}: {
  data: GenericFormData;
  id: number;
}) => {
  const response = await HttpClient.patch<Response<IBlogs>>(
    `${api.blogs.update}/${id}`,
    data,
  );
  return response;
};
export const useEditBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editBlogs,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: [api.blogs.get],
      });
      toastSuccess(response.data.toast || "Blogs updated");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error);
      toastFail(errorMsg || "Failed to update Blogs");
    },
  });
};
