import * as React from "react";
import * as Actions from "./actions";
import { IAppState } from "../../reducers/index";
import { DispatchProp } from "react-redux";
import { IChartStateRecord } from "./records";
import { connect } from "react-redux";
import AxiosCancelTokenManager from "../../helpers/axiosCancelTokenManager";
import { Helmet } from "react-helmet";

import { ITickersRecord, ITickerRecord, ITickerCurrencyArray } from "../../models/ticker";

const styles = require("./chart.scss");

export interface IChartContainerMappedState {
  chartState: IChartStateRecord;
  tickers: ITickersRecord;
}

export interface IChartContainerProps extends DispatchProp<IChartContainerMappedState> {
  chartState: IChartStateRecord;
  tickers: ITickersRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    chartState: state.chart,
    tickers: state.tickers,
  };
}

class ChartContainer extends React.PureComponent<IChartContainerProps, {}> {
  // private getOrderBook = () => {
  //   console.log("getOrderBook");
  //   const { dispatch } = this.props;

  //   dispatch(Actions.getOrderBook("eth", this.getAxiosCancelToken()));
  // };
  private getTickersInterval: any;
  private getTickers = () => {
    const { dispatch } = this.props;

    dispatch(Actions.getTickers(this.getAxiosCancelToken()));
  };

  private getAxiosCancelToken = () => {
    const axiosCancelTokenManager = new AxiosCancelTokenManager();
    return axiosCancelTokenManager.getCancelTokenSource();
  };

  public componentDidMount() {
    this.getTickers();
    this.getTickersInterval = setInterval(this.getTickers, 3000);
  }

  public componentWillUnMount() {
    clearInterval(this.getTickersInterval);
  }

  private mapTickerNode = (tickers: ITickersRecord) => {
    const tickerItems = ITickerCurrencyArray.map((currency: string, index) => {
      const ticker: ITickerRecord = tickers.get(currency);
      console.log("ticker is ", ticker);
      if (!ticker) return;
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
    console.log("rendering");
    const { tickers } = this.props;
    // console.log(RECORD.TICKERS);
    // console.log(RECORD.TICKERS.toJS());
    return (
      <div className={styles.chartContainer}>
        <Helmet title="test" />
        {this.mapTickerNode(tickers)}
      </div>
    );
    // if (chartState.isLoading) {
    //   return <Spinner />;
    // } else if (tickers.errorCode !== null) {

    // } else {
    //   return <Spinner />;
    // }
  }
}

export default connect(mapStateToProps)(ChartContainer);
