import { IReduxAction } from "../../typings/actionType";
import { ACTION_TYPES } from "../../actions/actionTypes";
import { HOME_INITIAL_STATE, IHomeStateRecord } from "./records";

export function reducer(state = HOME_INITIAL_STATE, action: IReduxAction<any>): IHomeStateRecord {
  switch (action.type) {
    case ACTION_TYPES.HOME_START_TO_GET_ORDER_BOOK: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", true).set("hasError", false);
      });
    }

    case ACTION_TYPES.HOME_SUCCEEDED_TO_GET_ORDER_BOOK: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", false);
      });
    }

    case ACTION_TYPES.HOME_FAILED_TO_GET_ORDER_BOOK: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", true);
      });
    }

    default:
      return state;
  }
}
