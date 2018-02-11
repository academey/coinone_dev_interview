import { AxiosResponse, CancelTokenSource } from "axios";
import { CoinoneAxios, COINONE_APP_ID } from "./coinoneApi";
import axios from "axios";
import { LAMBDA_HOST } from "../helpers/envChecker";

interface IGetAccessTokenParams {
  requestToken: string;
  cancelTokenSource: CancelTokenSource;
}

class OauthAPI extends CoinoneAxios {
  public async getRequestToken(cancelTokenSource: CancelTokenSource): Promise<string> {
    const getRequestTokenResponse: AxiosResponse = await this.get("oauth/request_token", {
      params: {
        app_id: COINONE_APP_ID,
      },
      cancelToken: cancelTokenSource.token,
    });
    const requestToken = getRequestTokenResponse.data;

    return requestToken;
  }

  public async getAccessToken({ requestToken, cancelTokenSource }: IGetAccessTokenParams): Promise<string> {
    const getAccessTokenResponse: AxiosResponse = await axios.post(`${LAMBDA_HOST}/getAccessToken`, {
      requestToken,
      appId: COINONE_APP_ID,
      cancelToken: cancelTokenSource.token,
    });

    const accessToken = getAccessTokenResponse.data;

    return accessToken;
  }

  public getOauthLoginUrl() {
    return `https://coinone.co.kr/account/login/?app_id=${COINONE_APP_ID}`;
  }
}

const apiHelper = new OauthAPI();

export default apiHelper;
