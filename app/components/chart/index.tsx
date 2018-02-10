import * as React from "react";
import * as Actions from "./actions";
import { IAppState } from "../../reducers/index";
import { DispatchProp } from "react-redux";
import { IChartStateRecord } from "./records";
import { connect } from "react-redux";
import AxiosCancelTokenManager from "../../helpers/axiosCancelTokenManager";
import { Helmet } from "react-helmet";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { ITickersRecord, ITickerRecord, ITickerCurrencyArray } from "../../models/ticker";
import numberWithCommas from "../../helpers/numberWithCommas";

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
      const ticker: ITickerRecord = tickers[currency];
      if (!ticker) return;
      return (
        <div key={`ticker_${index}`} className={styles.ticker}>
          <span className={styles.label}>{ticker.last_price}</span>
          <span className={styles.label}>{ticker.currency}</span>
        </div>
      );
    });

    return <div className={styles.tickerItems}>{tickerItems}</div>;
  };

  public render() {
    const { tickers } = this.props;

    let tableData = Array();
    ITickerCurrencyArray.forEach((currency: string) => {
      const ticker: ITickerRecord = tickers[currency];
      if (!ticker) return;
      tableData.push(ticker);
    });

    const tableColumns = [
      {
        Header: "Currency",
        id: "currency", // Required because our accessor is not a string
        accessor: (ticker: ITickerRecord) => ticker.currency.toUpperCase(),
      },
      {
        Header: "Price(￦, %)",
        accessor: "last_price",
        Cell: (props: any) => {
          const ticker: ITickerRecord = props.original;
          const diffPriceForADay = ticker.last_price - ticker.first_price;
          const diffPercentageForADay = (diffPriceForADay / ticker.first_price * 100).toFixed(2);
          const surplusForADay = diffPriceForADay > 0;

          if (surplusForADay) {
            return (
              <span className="number">
                {numberWithCommas(ticker.last_price)}{" "}
                <span className={styles.surplusForADay}>{`+${numberWithCommas(
                  diffPriceForADay,
                )} (${diffPercentageForADay}%)`}</span>
              </span>
            );
          } else {
            return (
              <span className="number">
                {numberWithCommas(ticker.last_price)}
                <span className={styles.deficitForADay}>{`-${numberWithCommas(
                  diffPriceForADay,
                )} (${diffPercentageForADay}%)`}</span>
              </span>
            );
          }
        },
      },
      {
        Header: "Volume",
        accessor: "volume",
      },
      {
        Header: "Yesterday(￦, %)",
        accessor: "yesterday_last",
        Cell: (props: any) => {
          const ticker: ITickerRecord = props.original;
          const yesterdayDiffPriceForADay = ticker.yesterday_last - ticker.yesterday_first;
          const yesterdayDiffPercentageForADay = (yesterdayDiffPriceForADay / ticker.first_price * 100).toFixed(2);
          const yesterdaySurplusForADay = yesterdayDiffPriceForADay > 0;

          if (yesterdaySurplusForADay) {
            return (
              <span className="number">
                {numberWithCommas(ticker.yesterday_last)}{" "}
                <span className={styles.surplusForADay}>{`+${numberWithCommas(
                  yesterdayDiffPriceForADay,
                )} (${yesterdayDiffPercentageForADay}%)`}</span>
              </span>
            );
          } else {
            return (
              <span className="number">
                {numberWithCommas(ticker.yesterday_last)}{" "}
                <span className={styles.deficitForADay}>{`-${numberWithCommas(
                  yesterdayDiffPriceForADay,
                )} (${yesterdayDiffPercentageForADay}%)`}</span>
              </span>
            );
          }
        },
      },
    ];

    const isLoading = tickers.timestamp === null;
    return (
      <div className={styles.chartContainer}>
        <Helmet title="test" />
        {this.mapTickerNode(tickers)}
        <ReactTable loading={isLoading} showPagination={false} data={tableData} columns={tableColumns} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChartContainer);
