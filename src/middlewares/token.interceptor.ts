import api from "./api";
import type { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import TokenStorageService from "@/services/storage/token-storage.service";


const setupTokenInterceptor = (): void => {
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = TokenStorageService.getTokens()?.accessToken;

      if (token) (<AxiosRequestHeaders>config.headers)["Authorization"] = `Bearer ${token}`;

      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default setupTokenInterceptor;
