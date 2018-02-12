import { IReduxAction } from "../typings/actionType";
import { ACTION_TYPES } from "../actions/actionTypes";
import { CURRENT_USER_INITIAL_STATE, ICurrentUserRecord } from "../models/currentUser";

export function reducer(state = CURRENT_USER_INITIAL_STATE, action: IReduxAction<any>): ICurrentUserRecord {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN_SUCCEEDED_TO_GET_ACCESS_TOKEN: {
      return state.withMutations(currentState => {
        return currentState
          .set("oauthLoggedIn", true)
          .set("isLoggedIn", true)
          .set("accessToken", action.payload.accessToken);
      });
    }

    default:
      return state;
  }
}
