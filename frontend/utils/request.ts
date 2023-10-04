import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { getAuthorization, getRecovery } from "./auth";
import Router from "next/router";
import { getAuthorization, removeToken } from "./auth";

/**
 * Create an Axios Client with defaults
 */

interface CustomRequest extends AxiosRequestConfig {
  private?: boolean;
}
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

// Manejo de códigos de error del backend.
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.config.url !== "/user/signIn" &&
      error.response.status === 401
    ) {
      Router.push({ pathname: "/login" });
    }
    return Promise.reject(error);
  }
);

/**
 * Request Wrapper with default success/error actions
 */
const request = (options: CustomRequest): Promise<AxiosResponse> => {
  if (options.private) {
    client.defaults.headers.common.Authorization = getAuthorization();
  } else {
    delete client.defaults.headers.common.Authorization;
  }

  const onSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const onError = (error: AxiosError): Promise<any> => {
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
