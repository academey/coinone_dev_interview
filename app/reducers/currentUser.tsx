import { IReduxAction } from "../typings/actionType";
import { ACTION_TYPES } from "../actions/actionTypes";
import { CURRENT_USER_INITIAL_STATE, ICurrentUserRecord } from "../models/currentUser";

export function reducer(state = CURRENT_USER_INITIAL_STATE, action: IReduxAction<any>): ICurrentUserRecord {
  switch (action.type) {
    case ACTION_TYPES.CHART_SUCCEEDED_TO_GET_TICKERS: {
      return action.payload.tickers;
    }

    default:
      return state;
  }
}
