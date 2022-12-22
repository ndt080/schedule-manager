import api from "./api";
import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { ApiErrorCode } from "@/core/consts/api-error-code";

export interface ApiError {
  code: ApiErrorCode;
  error: string;
  success: boolean;
}


const setupErrorInterceptor = (): void => {
  api.interceptors.response.use((response: AxiosResponse) => response,
    (error: AxiosError) => {
      const data = error.response?.data as ApiError;
      return Promise.reject(data.error || "Error");
    });
};

export default setupErrorInterceptor;
