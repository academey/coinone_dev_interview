import { AxiosResponse, CancelTokenSource } from "axios";
import { CoinoneAxios } from "./coinoneApi";

interface IGetBalanceParams {
  accessToken: string;
  cancelTokenSource: CancelTokenSource;
}

interface IGetUserInformationParams {
  accessToken: string;
  cancelTokenSource: CancelTokenSource;
}

class AccountAPI extends CoinoneAxios {
  public async getBalance({ accessToken, cancelTokenSource }: IGetBalanceParams): Promise<string> {
    const getBalanceResponse: AxiosResponse = await this.get("v2/account/balance", {
      params: {
        access_token: accessToken,
      },
      cancelToken: cancelTokenSource.token,
    });
    const getBalanceData = getBalanceResponse.data;

    return getBalanceData;
  }

  public async getUserInformation({ accessToken, cancelTokenSource }: IGetUserInformationParams): Promise<string> {
    const getUserInformationResponse: AxiosResponse = await this.get("v2/account/user_info", {
      params: {
        access_token: accessToken,
      },
      cancelToken: cancelTokenSource.token,
    });
    const getUserInformationData = getUserInformationResponse.data;
    const userEmail = getUserInformationData.userInfo.emailInfo.email;
    return userEmail;
  }
}

const apiHelper = new AccountAPI();

export default apiHelper;
