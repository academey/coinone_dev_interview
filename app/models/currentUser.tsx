import { TypedRecord, makeTypedFactory } from "typed-immutable-record";

export interface ICurrentUser {
  isLoggedIn: boolean;
  oauthLoggedIn: boolean;
  email: string | null;
  name: string | null;
  id: number | null;
}

export const initialCurrentUser: ICurrentUser = {
  isLoggedIn: false,
  oauthLoggedIn: null,
  email: null,
  name: null,
  id: null,
};

export interface ICurrentUserRecord extends TypedRecord<ICurrentUserRecord>, ICurrentUser {}

export const CurrentUserFactory = makeTypedFactory<ICurrentUser, ICurrentUserRecord>(initialCurrentUser);

export const CURRENT_USER_INITIAL_STATE: ICurrentUserRecord = CurrentUserFactory(initialCurrentUser);
