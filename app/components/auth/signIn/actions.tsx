import { ACTION_TYPES } from "../../../actions/actionTypes";
import { Dispatch } from "redux";
import { LAMBDA_HOST } from "../../../helpers/envChecker";
import axios from "axios";
import { COINONE_APP_ID } from "../../../api/baseApi";

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

export function getAccessToken(requestToken: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SIGN_IN_START_TO_GET_ACCESS_TOKEN,
    });

    try {
      const getAccessTokenResponse = await axios.post(`${LAMBDA_HOST}/getAccessToken`, {
        requestToken,
        appId: COINONE_APP_ID,
      });

      const accessToken = getAccessTokenResponse.data;
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
