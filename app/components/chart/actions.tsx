import { Dispatch } from "redux";
import { ACTION_TYPES } from "../../actions/actionTypes";
import CoinoneAPI from "../../api/coinone";
import { CancelTokenSource } from "axios";
import { COINONE_CURRENCY } from "../../api/coinone";
import { ITickersRecord } from "../../models/ticker";

export function getOrderBook(currency: COINONE_CURRENCY, cancelTokenSource: CancelTokenSource) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.CHART_START_TO_GET_ORDER_BOOK,
    });
    const getOrderBookResult = await CoinoneAPI.getOrderBook({
      currency,
      cancelTokenSource,
    });
    dispatch({
      type: ACTION_TYPES.CHART_SUCCEEDED_TO_GET_ORDER_BOOK,
      payload: {
        getOrderBookResult,
      },
    });
    // try {
    //   await CoinoneAPI.getOrderBook({
    //     currency,
    //     cancelTokenSource,
    //   });
    //   dispatch({
    //     type: ACTION_TYPES.HOME_SUCCEEDED_TO_GET_ORDER_BOOK,
    //   });
    // } catch (err) {
    //   alert(`Failed to get order Book ! ${err}`);
    //   dispatch({
    //     type: ACTION_TYPES.HOME_FAILED_TO_GET_ORDER_BOOK,
    //   });
    // }
  };
}

export function getTickers(cancelTokenSource: CancelTokenSource) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.CHART_START_TO_GET_TICKERS,
    });
    const getTickersResult: ITickersRecord = await CoinoneAPI.getTickers({
      cancelTokenSource,
    });

    dispatch({
      type: ACTION_TYPES.CHART_SUCCEEDED_TO_GET_TICKERS,
      payload: {
        tickers: getTickersResult,
      },
    });
  };
}
