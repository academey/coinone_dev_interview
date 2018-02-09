import { Dispatch } from "redux";
import { ACTION_TYPES } from "../../actions/actionTypes";
import CoinoneAPI from "../../api/coinone";
import { CancelTokenSource } from "axios";

export function getOrderBook(currency: string, cancelTokenSource: CancelTokenSource) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.HOME_START_TO_GET_ORDER_BOOK,
    });

    try {
      await CoinoneAPI.getOrderBook({
        currency,
        cancelTokenSource,
      });
      dispatch({
        type: ACTION_TYPES.HOME_SUCCEEDED_TO_GET_ORDER_BOOK,
      });
    } catch (err) {
      alert(`Failed to get order Book ! ${err}`);
      dispatch({
        type: ACTION_TYPES.HOME_FAILED_TO_GET_ORDER_BOOK,
      });
    }
  };
}
