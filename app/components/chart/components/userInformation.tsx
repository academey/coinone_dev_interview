import * as React from "react";
import oauthApi from "../../../api/oauth";
import { IBalancesRecord, IBalanceCurrencyArray, IBalanceRecord } from "../../../models/balance";
import { ITickersRecord, ITickerRecord } from "../../../models/ticker";
import numberWithCommas from "../../../helpers/numberWithCommas";

const styles = require("./userInformation.scss");

export interface IUserInformationProps {
  isLoggedIn: boolean;
  tickers: ITickersRecord;
  balances: IBalancesRecord;
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

function getUserInformation(props: IUserInformationProps) {
  const { isLoggedIn, balances, tickers } = props;
  if (isLoggedIn) {
    return (
      <a className={styles.notLoggedIn} href={oauthApi.getOauthLoginUrl()}>
        First, login with coinone!
      </a>
    );
  } else {
    const balanceItems = Array();

    IBalanceCurrencyArray.forEach((currency: string) => {
      const balance: IBalanceRecord = balances[currency];

      const notHavingThisCurrency = !balance || balance.avail < 0.00001;
      if (notHavingThisCurrency) {
        return;
      } else if (currency === "krw") {
        const availBalance = parseFloat(balance.avail as any);
        const balanceString = numberWithCommas(parseFloat(availBalance.toFixed(2)));

        balanceItems.push(
          <div key={`balance_${currency}`} className={styles.balanceItem}>
            <span className={styles.currency}>{currency.toUpperCase()}</span>
            <span className={styles.currencyValue}>{balanceString}￦</span>
          </div>,
        );
      } else {
        let currentValue = null;
        let currentValueString = null;
        const ticker: ITickerRecord = tickers[currency];
        if (!!ticker) {
          currentValue = balance.avail * ticker.last_price;
          currentValueString = numberWithCommas(parseFloat(currentValue.toFixed(2)));
        }

        balanceItems.push(
          <div key={`balance_${currency}`} className={styles.balanceItem}>
            <span className={styles.currency}>{currency.toUpperCase()}</span>
            <span className={styles.currencyValue}>{currentValueString}￦</span>
          </div>,
        );
      }
    });

    return <div className={styles.balanceItems}>{balanceItems}</div>;
  }
}

export default UserInformation;
