import * as React from "react";
import oauthApi from "../../../api/oauth";
import { IBalancesRecord } from "../../../models/balance";
import { ITickersRecord } from "../../../models/ticker";

const styles = require("./userInformation.scss");

export interface IUserInformationProps {
  isLoggedIn: boolean;
  tickers: ITickersRecord;
  balances: IBalancesRecord;
}

function getUserInformation(props: IUserInformationProps) {
  const { isLoggedIn, balances } = props;
  if (isLoggedIn) {
    return (
      <a className={styles.notLoggedIn} href={oauthApi.getOauthLoginUrl()}>
        First, login with coinone!
      </a>
    );
  } else {
    return <div>{balances["eth"]}</div>;
  }
}

const UserInformation = (props: IUserInformationProps) => {
  return (
    <div className={styles.userInformationContainer}>
      <div className={styles.title}>Your Information</div>
      <div className={styles.description}>Analyze your coin status</div>
      {getUserInformation(props)}
    </div>
  );
};

export default UserInformation;
