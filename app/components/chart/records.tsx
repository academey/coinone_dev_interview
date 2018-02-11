import { TypedRecord, makeTypedFactory } from "typed-immutable-record";
import { COINONE_CURRENCY } from "../../api/coinone";

export interface IChartState {
  isLoading: boolean;
  hasError: boolean;
  titleCurrency: COINONE_CURRENCY;
}

export interface IChartStateRecord extends TypedRecord<IChartStateRecord>, IChartState {}

const initialChartState: IChartState = {
  isLoading: false,
  hasError: false,
  titleCurrency: "btc",
};

export const ChartStateFactory = makeTypedFactory<IChartState, IChartStateRecord>(initialChartState);

export const CHART_INITIAL_STATE = ChartStateFactory();
