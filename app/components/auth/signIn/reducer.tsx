import { IReduxAction } from "../../../typings/actionType";
import { SIGN_IN_INITIAL_STATE, ISignInStateRecord } from "./records";
import { ACTION_TYPES } from "../../../actions/actionTypes";

export function reducer(state = SIGN_IN_INITIAL_STATE, action: IReduxAction<any>): ISignInStateRecord {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN_CHANGE_EMAIL_INPUT: {
      return state.set("email", action.payload.email);
    }

    case ACTION_TYPES.SIGN_IN_CHANGE_PASSWORD_INPUT: {
      return state.set("password", action.payload.password);
    }

    case ACTION_TYPES.SIGN_IN_START_TO_GET_ACCESS_TOKEN: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", true).set("hasError", false);
      });
    }

    case ACTION_TYPES.SIGN_IN_SUCCEEDED_TO_GET_ACCESS_TOKEN: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", false);
      });
    }

    case ACTION_TYPES.SIGN_IN_FAILED_TO_GET_ACCESS_TOKEN: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", true);
      });
    }

    default:
      return state;
  }
}
