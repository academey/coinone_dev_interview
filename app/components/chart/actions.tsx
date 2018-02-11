import { Dispatch } from "redux";
import { ACTION_TYPES } from "../../actions/actionTypes";
import CoinoneAPI, { COINONE_CURRENCY } from "../../api/currency";
import { CancelTokenSource } from "axios";
import { ITickersRecord } from "../../models/ticker";

export function getOrderBook(currency: COINONE_CURRENCY, cancelTokenSource: CancelTokenSource) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.CHART_START_TO_GET_ORDER_BOOK,
    });
    try {
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
    } catch (err) {
      alert(`Failed to get order Book ! ${err}`);
      dispatch({
        type: ACTION_TYPES.CHART_FAILED_TO_GET_ORDER_BOOK,
      });
    }
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
    try {
      dispatch({
        type: ACTION_TYPES.CHART_SUCCEEDED_TO_GET_TICKERS,
        payload: {
          tickers: getTickersResult,
        },
      });
    } catch (err) {
      alert(`Failed to get tickers ! ${err}`);
      dispatch({
        type: ACTION_TYPES.CHART_FAILED_TO_GET_TICKERS,
      });
    }
  };
}

export function changeTitleCurrency(currency: COINONE_CURRENCY) {
  return {
    type: ACTION_TYPES.CHART_CHANGE_TITLE_CURRENCY,
    payload: {
      currency,
    },
  };
}

export function togglePopover(currency: COINONE_CURRENCY, targetElement: any) {
  return {
    type: ACTION_TYPES.CHART_TOGGLE_POPOVER,
    payload: {
      currency,
      targetElement,
    },
  };
}

export function closePopover() {
  return {
    type: ACTION_TYPES.CHART_CLOSE_POPOVER,
  };
}
