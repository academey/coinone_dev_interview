import { ITicker, TickerFactory } from "../models/ticker";

export const RAW = {
  TICKER: require("./ticker.json") as ITicker,
};

export const RECORD = {
  TICKER: TickerFactory(RAW.TICKER),
};
