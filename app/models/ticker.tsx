import { TypedRecord, makeTypedFactory } from "typed-immutable-record";
import { COINONE_CURRENCY } from "../api/coinone";

export interface ITicker {
  result: string | null;
  errorCode: number | null;
  // first: number | null;
  // last: number | null;
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

export const initialTicker: ITicker = {
  result: null,
  errorCode: null,
  // first: null,
  // last: null,
  high: null,
  low: null,
  volume: null,
  yesterday_first: null,
  yesterday_last: null,
  yesterday_high: null,
  yesterday_low: null,
  yesterday_volume: null,
  timestamp: null,
  currency: null,
};

export interface ITickerRecord extends TypedRecord<ITickerRecord>, ITicker {}

export const TickerFactory = makeTypedFactory<ITicker, ITickerRecord>(initialTicker);
