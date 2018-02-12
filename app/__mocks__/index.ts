import { ITickers, recordifyTickers } from "../models/ticker";
import { IBalances, recordifyBalances } from "../models/balance";

export const RAW = {
  TICKERS: require("./tickers.json") as ITickers,
  BALANCES: require("./balances.json") as IBalances,
};

export const MOCK_RECORD = {
  TICKERS: recordifyTickers(RAW.TICKERS),
  BALANCES: recordifyBalances(RAW.BALANCES),
};
