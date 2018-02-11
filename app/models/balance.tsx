import { recordify, TypedRecord, makeTypedFactory } from "typed-immutable-record";

export interface IBalance {
  avail: number | null;
  balance: number | null;
}

export interface IBalances {
  errorCode: number | null;
  [currencyName: string]: any;
}

export const initialBalances: IBalances = {
  errorCode: null,
  btc: null,
  bch: null,
  eth: null,
  etc: null,
  xrp: null,
  qtum: null,
  iota: null,
  ltc: null,
  btg: null,
  krw: null,
};

export const initialBalance: IBalance = {
  avail: null,
  balance: null,
};

export interface IBalanceRecord extends TypedRecord<IBalanceRecord>, IBalance {}

export interface IBalancesRecord extends TypedRecord<IBalancesRecord>, IBalances {}

export const BalanceFactory = makeTypedFactory<IBalance, IBalanceRecord>(initialBalance);

export const IBalanceCurrencyArray = ["btc", "bch", "eth", "etc", "xrp", "qtum", "iota", "ltc", "btg", "krw"];

export function recordifyBalances(balances: IBalances = initialBalances): IBalancesRecord {
  let resultBalances: IBalances = initialBalances;
  resultBalances.errorCode = balances.errorCode;
  resultBalances.timestamp = balances.timestamp;

  IBalanceCurrencyArray.forEach((currency: string) => {
    const balance: IBalance = balances[currency];
    if (!balance) return;

    resultBalances[currency] = BalanceFactory(balance);
  });

  return recordify(resultBalances);
}

export const BALANCES_INITIAL_STATE: IBalancesRecord = recordifyBalances(initialBalances);
