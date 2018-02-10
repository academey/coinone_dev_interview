import { IReduxAction } from "../typings/actionType";
import { ACTION_TYPES } from "../actions/actionTypes";
import { TICKERS_INITIAL_STATE, ITickersRecord } from "../models/ticker";

export function reducer(state = TICKERS_INITIAL_STATE, action: IReduxAction<any>): ITickersRecord {
  switch (action.type) {
    case ACTION_TYPES.CHART_SUCCEEDED_TO_GET_TICKERS: {
      return action.payload.tickers;
    }

    default:
      return state;
  }
}
