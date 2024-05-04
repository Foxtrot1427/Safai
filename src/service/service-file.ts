import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { HttpClient } from "./service-axios";
import { getMimeTypeFromExtension } from "../utils/mimeTypes";

const getBlobFromUrl = async (url: string) => {
  const response = await HttpClient.get<Blob>(url, {
    responseType: "blob",
  });
  return response;
};

export const useFileFromUrl = (url: string): UseQueryResult<File, unknown> => {
  const filename = url?.split("/").pop() || "";
  const extension = url?.split(".").pop() || "";
  return useQuery({
    queryKey: ["blob", url],
    queryFn: () => getBlobFromUrl(url),
    select: response =>
      new File([response.data], filename, {
        type: getMimeTypeFromExtension(extension),
      }),
    enabled: !!url,
    staleTime: 0,
  });
};
