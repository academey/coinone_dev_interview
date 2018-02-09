import axios, { AxiosRequestConfig } from "axios";

const COINONE_API_HOST = "https://api.coinone.co.kr";

export default class BaseAxios {
  protected instance = axios.create({
    baseURL: COINONE_API_HOST,
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Credentials": true,
      // "Access-Control-Allow-Origin": "http://localhost:8080/",
      //Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE Content-Type: application/json
    },
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
