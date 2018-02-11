import { IReduxAction } from "../../typings/actionType";
import { ACTION_TYPES } from "../../actions/actionTypes";
import { CHART_INITIAL_STATE, IChartStateRecord } from "./records";

export function reducer(state = CHART_INITIAL_STATE, action: IReduxAction<any>): IChartStateRecord {
  switch (action.type) {
    case ACTION_TYPES.CHART_START_TO_GET_TICKERS:
    case ACTION_TYPES.CHART_START_TO_GET_ORDER_BOOK: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", true).set("hasError", false);
      });
    }

    case ACTION_TYPES.CHART_SUCCEEDED_TO_GET_TICKERS:
    case ACTION_TYPES.CHART_SUCCEEDED_TO_GET_ORDER_BOOK: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", false);
      });
    }

    case ACTION_TYPES.CHART_FAILED_TO_GET_TICKERS:
    case ACTION_TYPES.CHART_FAILED_TO_GET_ORDER_BOOK: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", true);
      });
    }

    case ACTION_TYPES.CHART_CHANGE_TITLE_CURRENCY: {
      return state.set("titleCurrency", action.payload.currency);
    }

    case ACTION_TYPES.CHART_TOGGLE_POPOVER: {
      const toggledIsPopoverOpen = !state.isPopoverOpen;

      return state.withMutations(currentState => {
        return currentState
          .set("popoverOpenCurrency", action.payload.currency)
          .set("popoverAnchorEl", action.payload.targetElement)
          .set("isPopoverOpen", toggledIsPopoverOpen);
      });
    }

    case ACTION_TYPES.CHART_CLOSE_POPOVER: {
      return state.set("isPopoverOpen", false);
    }

    case ACTION_TYPES.GLOBAL_LOCATION_CHANGE: {
      return CHART_INITIAL_STATE;
    }

    default:
      return state;
  }
}
