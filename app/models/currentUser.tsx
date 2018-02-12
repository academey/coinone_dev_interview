import { TypedRecord, recordify } from "typed-immutable-record";
import { IBalancesRecord, recordifyBalances } from "./balance";

export interface ICurrentUser {
  isLoggedIn: boolean;
  oauthLoggedIn: boolean;
  email: string | null;
  name: string | null;
  id: number | null;
  balances: IBalancesRecord;
  accessToken: string | null;
}

export const initialCurrentUser: ICurrentUser = {
  isLoggedIn: false,
  oauthLoggedIn: null,
  email: null,
  name: null,
  id: null,
  balances: null,
  accessToken: null,
};

export interface ICurrentUserRecord extends TypedRecord<ICurrentUserRecord>, ICurrentUser {}

export function recordifyCurrentUser(currentUser: ICurrentUser = initialCurrentUser): ICurrentUserRecord {
  let recordifiedBalances: IBalancesRecord = null;

  if (!!currentUser.balances) {
    recordifiedBalances = recordifyBalances(currentUser.balances);
  }

  return recordify({
    isLoggedIn: currentUser.isLoggedIn,
    oauthLoggedIn: currentUser.oauthLoggedIn,
    email: currentUser.email,
    name: currentUser.name,
    id: currentUser.id,
    balances: recordifiedBalances,
    accessToken: currentUser.accessToken,
  });
}

export const CURRENT_USER_INITIAL_STATE: ICurrentUserRecord = recordifyCurrentUser(initialCurrentUser);
