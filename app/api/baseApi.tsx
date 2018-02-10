import axios, { AxiosRequestConfig } from "axios";

const COINONE_API_HOST = "https://api.coinone.co.kr";
export const COINONE_APP_ID = "63f24095-eed4-4ae5-aeb6-04ff0650638a";

export class BaseAxios {
  protected instance = axios.create({
    baseURL: COINONE_API_HOST,
    withCredentials: false,
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
