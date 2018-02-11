import { TypedRecord, makeTypedFactory } from "typed-immutable-record";
import { COINONE_CURRENCY } from "../../api/currency";

export interface IChartState {
  isLoading: boolean;
  hasError: boolean;
  titleCurrency: COINONE_CURRENCY;
  isPopoverOpen: boolean;
  popoverAnchorEl: any;
  popoverOpenCurrency: COINONE_CURRENCY;
}

export interface IChartStateRecord extends TypedRecord<IChartStateRecord>, IChartState {}

const initialChartState: IChartState = {
  isLoading: false,
  hasError: false,
  titleCurrency: "btc",
  isPopoverOpen: false,
  popoverAnchorEl: null,
  popoverOpenCurrency: null,
};

export const ChartStateFactory = makeTypedFactory<IChartState, IChartStateRecord>(initialChartState);

export const CHART_INITIAL_STATE = ChartStateFactory();
