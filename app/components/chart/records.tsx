import { TypedRecord, makeTypedFactory } from "typed-immutable-record";

export interface IChartState {
  isLoading: boolean;
  hasError: boolean;
}

export interface IChartStateRecord extends TypedRecord<IChartStateRecord>, IChartState {}

const initialChartState: IChartState = {
  isLoading: false,
  hasError: false,
};

export const ChartStateFactory = makeTypedFactory<IChartState, IChartStateRecord>(initialChartState);

export const CHART_INITIAL_STATE = ChartStateFactory();
