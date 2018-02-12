import * as React from "react";
import * as Actions from "./actions";
import { IAppState } from "../../reducers/index";
import { DispatchProp } from "react-redux";
import { IChartStateRecord } from "./records";
import { connect } from "react-redux";
import AxiosCancelTokenManager from "../../helpers/axiosCancelTokenManager";
import { Helmet } from "react-helmet";
import { ITickersRecord, ITickerRecord } from "../../models/ticker";

import ChartTable from "./components/chartTable";
import UserInformation from "./components/userInformation";
import { ICurrentUserRecord } from "../../models/currentUser";
import numberWithCommas from "../../helpers/numberWithCommas";
import { COINONE_CURRENCY } from "../../api/currency";
import { MOCK_RECORD } from "../../__mocks__/index";

const styles = require("./chart.scss");

export interface IChartContainerMappedState {
  chartState: IChartStateRecord;
  tickers: ITickersRecord;
  currentUser: ICurrentUserRecord;
}

export interface IChartContainerProps extends DispatchProp<IChartContainerMappedState> {
  chartState: IChartStateRecord;
  tickers: ITickersRecord;
  currentUser: ICurrentUserRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    chartState: state.chart,
    tickers: state.tickers,
    currentUser: state.currentUser,
  };
}

class ChartContainer extends React.Component<IChartContainerProps, {}> {
  private getTickersIntervalId: any;

  public componentDidMount() {
    this.getTickers();
    this.getTickersIntervalId = setInterval(this.getTickers, 3000);
  }

  public componentWillUnmount() {
    clearInterval(this.getTickersIntervalId);
  }

  public render() {
    const { tickers, currentUser, chartState } = this.props;
    const { isPopoverOpen, popoverAnchorEl, popoverOpenCurrency } = chartState;
    const isLoading = tickers.timestamp === null;

    return (
      <div className={styles.chartContainer}>
        <Helmet title={this.getTitleContent()} />
        <div className={styles.title}>Coin Chart</div>
        <div className={styles.description}>(refresh per 3 sec)</div>
        <ChartTable
          isLoading={isLoading}
          tickers={tickers}
          changeTitleCurrency={this.changeTitleCurrency}
          isPopoverOpen={isPopoverOpen}
          popoverAnchorEl={popoverAnchorEl}
          popoverOpenCurrency={popoverOpenCurrency}
          togglePopover={this.togglePopover}
          closePopover={this.closePopover}
        />
        <UserInformation isLoggedIn={currentUser.isLoggedIn} tickers={tickers} balances={MOCK_RECORD.BALANCES} />
      </div>
    );
  }

  private togglePopover = (currency: COINONE_CURRENCY, targetElement: any) => {
    const { dispatch } = this.props;

    dispatch(Actions.togglePopover(currency, targetElement));
  };

  private closePopover = () => {
    const { dispatch } = this.props;

    dispatch(Actions.closePopover());
  };

  private changeTitleCurrency = (currency: COINONE_CURRENCY) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeTitleCurrency(currency));
  };

  private getTitleContent = () => {
    const { tickers, chartState } = this.props;
    const isLoading = tickers.timestamp === null;

    let titleContent = "Chart loading...";
    if (!isLoading) {
      const titleCurrencyTicker: ITickerRecord = tickers[chartState.titleCurrency];

      titleContent = `(${numberWithCommas(titleCurrencyTicker.last_price)}) ${chartState.titleCurrency.toUpperCase()}`;
    }
    return titleContent;
  };

  private getTickers = () => {
    const { dispatch } = this.props;

    dispatch(Actions.getTickers(this.getAxiosCancelToken()));
  };

  private getAxiosCancelToken = () => {
    const axiosCancelTokenManager = new AxiosCancelTokenManager();
    return axiosCancelTokenManager.getCancelTokenSource();
  };
}

export default connect(mapStateToProps)(ChartContainer);
