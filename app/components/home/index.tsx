import * as React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "../../helpers/withStylesHelper";
import * as Actions from "./actions";
import { IAppState } from "../../reducers/index";
import { DispatchProp } from "react-redux";
import { IHomeStateRecord } from "./records";
import { connect } from "react-redux";

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

@withStyles<typeof HomeContainer>(styles)
class HomeContainer extends React.PureComponent<IHomeContainerProps, {}> {
  private getOrderBook = () => {
    const { dispatch } = this.props;

    dispatch(Actions.getOrderBook());
  };

  public componentDidMount() {
    this.getOrderBook();
  }

  public render() {
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
