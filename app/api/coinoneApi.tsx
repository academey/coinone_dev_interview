import axios, { AxiosRequestConfig } from "axios";

const COINONE_API_HOST = "https://api.coinone.co.kr";
export const COINONE_APP_ID = "285f9a16-8cdd-471e-a4a0-14ced9da74d5";

export class CoinoneAxios {
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
