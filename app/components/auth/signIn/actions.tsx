import { ACTION_TYPES } from "../../../actions/actionTypes";
import { Dispatch } from "redux";
import { CancelTokenSource } from "axios";
import oauthApi from "../../../api/oauth";

export function changeEmailInput(email: string) {
  return {
    type: ACTION_TYPES.SIGN_IN_CHANGE_EMAIL_INPUT,
    payload: {
      email,
    },
  };
}

export function changePasswordInput(password: string) {
  return {
    type: ACTION_TYPES.SIGN_IN_CHANGE_PASSWORD_INPUT,
    payload: {
      password,
    },
  };
}
export function getRequestToken(cancelTokenSource: CancelTokenSource) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SIGN_IN_START_TO_GET_ACCESS_TOKEN,
    });

    try {
      const requestToken = await oauthApi.getRequestToken(cancelTokenSource);
      console.log("requestToken is ", requestToken);
      const accessToken = await oauthApi.getAccessToken({ requestToken, cancelTokenSource });
      console.log("accessToken is ", accessToken);

      dispatch({
        type: ACTION_TYPES.SIGN_IN_SUCCEEDED_TO_GET_ACCESS_TOKEN,
        payload: {
          accessToken,
        },
      });
    } catch (err) {
      alert(err);
      dispatch({
        type: ACTION_TYPES.SIGN_IN_FAILED_TO_GET_ACCESS_TOKEN,
      });
    }
  };
}
export function getAccessToken(requestToken: string, cancelTokenSource: CancelTokenSource) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SIGN_IN_START_TO_GET_ACCESS_TOKEN,
    });

    try {
      const accessToken = await oauthApi.getAccessToken({ requestToken, cancelTokenSource });
      console.log("accessToken is ", accessToken);
      dispatch({
        type: ACTION_TYPES.SIGN_IN_SUCCEEDED_TO_GET_ACCESS_TOKEN,
        payload: {
          accessToken,
        },
      });
    } catch (err) {
      alert(err);
      dispatch({
        type: ACTION_TYPES.SIGN_IN_FAILED_TO_GET_ACCESS_TOKEN,
      });
    }
  };
}
