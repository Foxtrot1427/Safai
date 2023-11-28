import axios, { AxiosError } from 'axios';
export interface ServerError {
  message: string;
  success: boolean;
}

const serverErrorResponse = (error: unknown, customMessage?: string) => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message: string }>;

    const errorObject = err?.response?.data?.message;

    return errorObject || customMessage || 'Something went wrong.';
  }
  return 'Something went wrong.';
};

export default serverErrorResponse;
