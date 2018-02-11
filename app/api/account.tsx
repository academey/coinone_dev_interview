import { AxiosResponse, CancelTokenSource } from "axios";
import { CoinoneAxios } from "./coinoneApi";

interface IGetBalanceParams {
  accessToken: string;
  cancelTokenSource: CancelTokenSource;
}

class AccountAPI extends CoinoneAxios {
  public async getBalance({ accessToken, cancelTokenSource }: IGetBalanceParams): Promise<string> {
    const getBalanceResponse: AxiosResponse = await this.get("v2/account/balance/", {
      params: {
        access_token: accessToken,
      },
      cancelToken: cancelTokenSource.token,
    });
    const getBalanceData = getBalanceResponse.data;

    return getBalanceData;
  }
}

const apiHelper = new AccountAPI();

export default apiHelper;
