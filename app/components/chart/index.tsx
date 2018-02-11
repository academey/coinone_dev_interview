import * as React from "react";
import * as Actions from "./actions";
import { IAppState } from "../../reducers/index";
import { DispatchProp } from "react-redux";
import { IChartStateRecord } from "./records";
import { connect } from "react-redux";
import AxiosCancelTokenManager from "../../helpers/axiosCancelTokenManager";
import { Helmet } from "react-helmet";
import { ITickersRecord } from "../../models/ticker";

import ChartTable from "./components/chartTable";
import UserInformation from "./components/userInformation";
import { ICurrentUserRecord } from '../../models/currentUser';

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
    currentUser: state.currentUser
  };
}

class ChartContainer extends React.PureComponent<IChartContainerProps, {}> {
  private getTickersInterval: any;

  public componentDidMount() {
    this.getTickers();
    this.getTickersInterval = setInterval(this.getTickers, 3000);
  }

  public componentWillUnMount() {
    clearInterval(this.getTickersInterval);
  }

  public render() {
    const { tickers,currentUser } = this.props;

    const isLoading = tickers.timestamp === null;

    return (
      <div className={styles.chartContainer}>
        <Helmet title="test" />
        <div className={styles.title}>Coin Chart(refresh per 3 sec)</div>
        <ChartTable isLoading={isLoading} tickers={tickers} />
        <UserInformation isLoggedIn={currentUser.isLoggedIn}/>
      </div>
    );
  }

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
