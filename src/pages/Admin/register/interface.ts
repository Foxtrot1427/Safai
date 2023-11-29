export type ISignupRequest = {
  name: string;
  address: string;
  email: string;
  password: string;
};

export type ISignupResponse = {
  name: string;
  email: string;
  address: string;
  password: string;
  id: number;
};
