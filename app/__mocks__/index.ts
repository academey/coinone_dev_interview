import { ITickers, recordifyTickers } from "../models/ticker";

export const RAW = {
  TICKERS: require("./tickers.json") as ITickers,
};

export const RECORD = {
  TICKERS: recordifyTickers(RAW.TICKERS),
};
