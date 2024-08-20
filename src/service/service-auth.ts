import {
  ILoginRequest,
  ILoginResponseData,
} from "@rsces/pages/Admin/login/interface";
import { HttpClient } from "./service-axios";
import { Response, api } from "./service-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastFail, toastSuccess } from "./service-toast";
import TokenService from "./service-token";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@rsces/routes/routes.constant";
import serverErrorResponse from "./service-error";
import {
  ISignupRequest,
  ISignupResponse,
} from "@rsces/pages/Admin/register/interface";

export const authTokenKey = "authToken";

const initLogout = async () => {
  try {
    TokenService.clearToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: initLogout,
    onSuccess: () => {
      queryClient.setQueryData([authTokenKey], () => false);
      navigate(NAVIGATION_ROUTES.BASE, { replace: true });
      toastSuccess("Logged Out");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error, "Logout Failed");
      toastFail(errorMsg);
    },
  });
};

const initLogin = async (data: ILoginRequest) => {
  const response = await HttpClient.post<Response<ILoginResponseData>>(
    api.login,
    data,
  );
  return response;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: initLogin,
    onSuccess: response => {
      TokenService.setToken(response?.data?.results?.accessToken);
      queryClient.setQueryData([authTokenKey], () => true);
      navigate(NAVIGATION_ROUTES.ADMIN_DONATIONS);
      toastSuccess(response.data.toast || "Login Success");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error, "Login Failed");
      toastFail(errorMsg);
    },
  });
};

const initRegister = async (data: ISignupRequest) => {
  const response = await HttpClient.post<Response<ISignupResponse>>(
    api.register,
    data,
  );
  return response;
};

export const useRegisterAdmin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: initRegister,
    onSuccess: response => {
      navigate(NAVIGATION_ROUTES.ADMIN_LOGIN);
      toastSuccess(response.data.toast || "Registered Admin Successfully");
    },
    onError: error => {
      const errorMsg = serverErrorResponse(error, "Register Failed");
      toastFail(errorMsg);
    },
  });
};

const checkAuthentication = async () => {
  if (TokenService.getTokenDetails()) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
export const useAuthentication = () => {
  return useQuery({
    queryKey: [authTokenKey],
    queryFn: checkAuthentication,
  });
};
