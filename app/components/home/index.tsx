import * as React from "react";
import { Link } from "react-router-dom";
// import * as Actions from "./actions";
import { IAppState } from "../../reducers/index";
import { DispatchProp } from "react-redux";
import { IHomeStateRecord } from "./records";
import { connect } from "react-redux";
import { RECORD } from "../../__mocks__/index";
// import AxiosCancelTokenManager from "../../helpers/axiosCancelTokenManager";
// import { RECORD } from '../../__mocks__/index';

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
  // private getOrderBook = () => {
  //   const { dispatch } = this.props;

  //   dispatch(Actions.getOrderBook("eth", this.getAxiosCancelToken()));
  // };

  // private getAxiosCancelToken = () => {
  //   const axiosCancelTokenManager = new AxiosCancelTokenManager();
  //   return axiosCancelTokenManager.getCancelTokenSource();
  // };

  // public componentDidMount() {
  //   this.getOrderBook();
  // }

  public render() {
    console.log(RECORD.TICKERS);
    console.log(RECORD.TICKERS.toJS());
    return (
      <div className={styles.homeWrapper}>
        <div className={styles.homeWrapperBackground} />
        <div className={styles.homeContent}>
          <h2 className={styles.headline}>Hello Universal React + Serverless!</h2>
          <div className={styles.subHeadline}>
            You can start universal rendering React web app with Serverless Framework!
          </div>
          <Link to="/docs" className={styles.linkButton}>
            Go To Docs
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeContainer);
