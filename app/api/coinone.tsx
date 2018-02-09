import { AxiosResponse, CancelTokenSource } from "axios";
import BaseAxios from "./baseApi";

export type COINONE_CURRENCY = "btc" | "bch" | "eth" | "etc" | "xrp" | "qtum" | "iota" | "ltc" | "btg" | "all";
export type COINONE_PERIOD = "hour" | "day";

interface IGetOrderBookParams {
  currency: COINONE_CURRENCY;
  cancelTokenSource: CancelTokenSource;
}
interface IGetOrderBookResult {}

interface IGetRecentCompleteOrdersParams {
  currency: COINONE_CURRENCY;
  period: COINONE_PERIOD;
  cancelTokenSource: CancelTokenSource;
}
interface IGetRecentCompleteOrdersResult {}

interface IGetTickerParams {
  currency: COINONE_CURRENCY;
  cancelTokenSource: CancelTokenSource;
}
interface IGetTickerResult {}

class CoinoneAPI extends BaseAxios {
  public async getOrderBook({
    currency = "btc",
    cancelTokenSource,
  }: IGetOrderBookParams): Promise<IGetOrderBookResult> {
    const getOrderBookResponse: AxiosResponse = await this.get("orderbook", {
      params: {
        currency,
      },
      cancelToken: cancelTokenSource.token,
    });
    const getOrderBookData = getOrderBookResponse.data;

    return getOrderBookData;
  }

  public async getRecentCompleteOrders({
    currency = "btc",
    period,
    cancelTokenSource,
  }: IGetRecentCompleteOrdersParams): Promise<IGetRecentCompleteOrdersResult> {
    const getRecentCompleteOrdersResponse: AxiosResponse = await this.get("trades", {
      params: {
        period,
        currency,
      },
      cancelToken: cancelTokenSource.token,
    });
    const getRecentCompleteOrdersData = getRecentCompleteOrdersResponse.data;

    return getRecentCompleteOrdersData;
  }

  public async getTicker({ currency = "btc", cancelTokenSource }: IGetTickerParams): Promise<IGetTickerResult> {
    const getTickerResponse: AxiosResponse = await this.get("ticker", {
      params: {
        currency,
      },
      cancelToken: cancelTokenSource.token,
    });
    const getTickerData = getTickerResponse.data;

    return getTickerData;
  }
}

const apiHelper = new CoinoneAPI();

export default apiHelper;