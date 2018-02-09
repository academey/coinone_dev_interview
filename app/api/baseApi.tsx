import axios, { AxiosRequestConfig } from "axios";

const LAMBDA_API_HOST = "https://d2l4c5evd6ubxk.cloudfront.net";

export default class BaseAxios {
  protected instance = axios.create({
    baseURL: LAMBDA_API_HOST,
    withCredentials: true,
    timeout: 30000,
  });

  protected get(path: string, config?: AxiosRequestConfig) {
    return this.instance.get(path, config);
  }

  protected post(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post(path, data, config);
  }

  protected put(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put(path, data, config);
  }

  protected delete(path: string, config?: AxiosRequestConfig) {
    return this.instance.delete(path, config);
  }
}
