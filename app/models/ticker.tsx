import { TypedRecord, makeTypedFactory } from "typed-immutable-record";
import { COINONE_CURRENCY } from "../api/currency";
import { recordify } from "typed-immutable-record/dist/src/typed.factory";

export interface IRawTicker {
  first: number | null; // error due to reserved word
  last: number | null; // error due to reserved word
  high: number | null;
  low: number | null;
  volume: number | null;
  yesterday_first: number | null;
  yesterday_last: number | null;
  yesterday_high: number | null;
  yesterday_low: number | null;
  yesterday_volume: number | null;
  timestamp: number | null;
  currency: COINONE_CURRENCY | null;
}

export interface ITicker {
  first_price: number | null; // name changed due to reserved word
  last_price: number | null; // name changed due to reserved word
  high: number | null;
  low: number | null;
  volume: number | null;
  yesterday_first: number | null;
  yesterday_last: number | null;
  yesterday_high: number | null;
  yesterday_low: number | null;
  yesterday_volume: number | null;
  currency: COINONE_CURRENCY | null;
}
export interface ITickers {
  errorCode: number | null;
  timestamp: number | null;
  [currencyName: string]: any;
}

export const initialTickers: ITickers = {
  errorCode: null,
  timestamp: null,
  btc: null,
  bch: null,
  eth: null,
  etc: null,
  xrp: null,
  qtum: null,
  iota: null,
  ltc: null,
  btg: null,
};

export const initialTicker: ITicker = {
  first_price: null,
  last_price: null,
  high: null,
  low: null,
  volume: null,
  yesterday_first: null,
  yesterday_last: null,
  yesterday_high: null,
  yesterday_low: null,
  yesterday_volume: null,
  currency: null,
};

export interface ITickerRecord extends TypedRecord<ITickerRecord>, ITicker {}

export interface ITickersRecord extends TypedRecord<ITickersRecord>, ITickers {}

export const TickerFactory = makeTypedFactory<ITicker, ITickerRecord>(initialTicker);

export const ITickerCurrencyArray = ["btc", "bch", "eth", "etc", "xrp", "qtum", "iota", "ltc", "btg"];

export function recordifyTickers(tickers: ITickers = initialTickers): ITickersRecord {
  let resultTickers: ITickers = initialTickers;
  resultTickers.errorCode = tickers.errorCode;
  resultTickers.timestamp = tickers.timestamp;

  ITickerCurrencyArray.forEach((currency: string) => {
    const ticker: IRawTicker = tickers[currency];
    if (!ticker) return;

    resultTickers[currency] = recordify({
      first_price: ticker.first,
      last_price: ticker.last,
      high: ticker.high,
      low: ticker.low,
      volume: ticker.volume,
      yesterday_first: ticker.yesterday_first,
      yesterday_last: ticker.yesterday_last,
      yesterday_high: ticker.yesterday_high,
      yesterday_low: ticker.yesterday_low,
      yesterday_volume: ticker.yesterday_volume,
      currency: ticker.currency,
    });
  });

  return recordify(resultTickers);
}

export const TICKERS_INITIAL_STATE: ITickersRecord = recordifyTickers(initialTickers);
