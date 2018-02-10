import * as Redux from "redux";
import { routerReducer } from "react-router-redux";

import * as signUpReducer from "../components/auth/signUp/reducer";
import { SIGN_UP_INITIAL_STATE, ISignUpStateRecord } from "../components/auth/signUp/records";

import * as signInReducer from "../components/auth/signIn/reducer";
import { SIGN_IN_INITIAL_STATE, ISignInStateRecord } from "../components/auth/signIn/records";

import * as chartReducer from "../components/chart/reducer";
import { IChartStateRecord, CHART_INITIAL_STATE } from "../components/chart/records";

import * as tickersReducer from "./tickers";
import { ITickersRecord, TICKERS_INITIAL_STATE } from "../models/ticker";

export interface IAppState {
  routing?: any;
  signUp: ISignUpStateRecord;
  signIn: ISignInStateRecord;
  chart: IChartStateRecord;
  tickers: ITickersRecord;
}

export const initialState: IAppState = {
  signUp: SIGN_UP_INITIAL_STATE,
  signIn: SIGN_IN_INITIAL_STATE,
  chart: CHART_INITIAL_STATE,
  tickers: TICKERS_INITIAL_STATE,
};

export const rootReducer = Redux.combineReducers<IAppState>({
  routing: routerReducer,
  signUp: signUpReducer.reducer,
  signIn: signInReducer.reducer,
  chart: chartReducer.reducer,
  tickers: tickersReducer.reducer,
});
