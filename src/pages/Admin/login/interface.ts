export type ILoginRequest = {
  email: string;
  password: string;
};

export type ILoginResponseData = {
  accessToken: string;
  refreshToken: string;
};
