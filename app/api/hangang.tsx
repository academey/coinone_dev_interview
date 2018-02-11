import { AxiosResponse } from "axios";
import axios from "axios";

class HangangAPI {
  private axios = axios.create({
    baseURL: "http://hangang.dkserver.wo.tc",
    withCredentials: false,
    timeout: 30000,
  });

  public async getHangangTemperature(): Promise<string> {
    const getHangangTemperatureResponse: AxiosResponse = await this.axios.get("");
    const hangangTemperature = getHangangTemperatureResponse.data.temp;

    return hangangTemperature;
  }
}

const apiHelper = new HangangAPI();

export default apiHelper;
