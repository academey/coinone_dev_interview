import { Dispatch } from "redux";
import { ACTION_TYPES } from "../../actions/actionTypes";

export function getOrderBook() {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.HOME_START_TO_GET_ORDER_BOOK,
    });

    try {
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
