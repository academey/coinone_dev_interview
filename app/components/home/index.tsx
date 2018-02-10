import * as React from "react";
import * as Actions from "./actions";
import { IAppState } from "../../reducers/index";
import { DispatchProp } from "react-redux";
import { IHomeStateRecord } from "./records";
import { connect } from "react-redux";
import { RECORD } from "../../__mocks__/index";
import AxiosCancelTokenManager from "../../helpers/axiosCancelTokenManager";

import { ITickersRecord, ITickerRecord, ITickerCurrencyArray } from "../../models/ticker";

const styles = require("./home.scss");

export interface IHomeContainerMappedState {
  homeState: IHomeStateRecord;
}

export interface IHomeContainerProps extends DispatchProp<IHomeContainerMappedState> {
  homeState: IHomeStateRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    homeState: state.home,
  };
}

class HomeContainer extends React.PureComponent<IHomeContainerProps, {}> {
  private getOrderBook = () => {
    const { dispatch } = this.props;

    dispatch(Actions.getOrderBook("eth", this.getAxiosCancelToken()));
  };

  private getAxiosCancelToken = () => {
    const axiosCancelTokenManager = new AxiosCancelTokenManager();
    return axiosCancelTokenManager.getCancelTokenSource();
  };

  public componentDidMount() {
    this.getOrderBook();
  }

  private mapTickerNode = (tickers: ITickersRecord) => {
    const tickerItems = ITickerCurrencyArray.map((currency: string, index) => {
      const ticker: ITickerRecord = tickers.get(currency);
      return (
        <div key={`ticker_${index}`} className={styles.ticker}>
          <span />
          {ticker.first_price}
          {ticker.currency}
        </div>
      );
    });

    return <div className={styles.tickerItems}>{tickerItems}</div>;
  };

  public render() {
    console.log(RECORD.TICKERS);
    console.log(RECORD.TICKERS.toJS());
    return <div className={styles.homeContainer}>{this.mapTickerNode(RECORD.TICKERS)}</div>;
  }
}

export default connect(mapStateToProps)(HomeContainer);
