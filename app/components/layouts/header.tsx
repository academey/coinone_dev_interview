import * as React from "react";
import { Link } from "react-router-dom";
import { DispatchProp, connect } from "react-redux";
import Icon from "../../icons";
import oauthApi from "../../api/oauth";
import hangangAPI from "../../api/hangang";
import { ICurrentUserRecord } from "../../models/currentUser";
import { IAppState } from "../../reducers";

const styles = require("./header.scss");

export interface IHeaderMappedState {
  currentUser: ICurrentUserRecord;
}

export interface IHeaderProps extends DispatchProp<IHeaderMappedState> {
  currentUser: ICurrentUserRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    currentUser: state.currentUser,
  };
}

interface IHeaderComponentState {
  hangangTemperature: number;
}

class Header extends React.PureComponent<IHeaderProps, IHeaderComponentState> {
  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
      hangangTemperature: null,
    };
  }

  public componentDidMount() {
    this.getHangangTemperature();
  }

  public render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.headerContainer}>
          <div className={styles.leftBox}>
            <Link to="/" className={styles.headerLogo}>
              <Icon icon="HEADER_LOGO" />
            </Link>
            <Link className={styles.linkItem} to="/">
              Chart
            </Link>
            <Link className={styles.linkItem} to="/expectation">
              Expectation
            </Link>
            <label className={styles.hangangTemperature}>{`${this.state.hangangTemperature}°C`}</label>
          </div>
          <div className={styles.rightBox}>
            {this.getAuthItem()}
            <a href="https://github.com/academey/coinone_dev_interview" target="_blank" className={styles.linkItem}>
              Github
            </a>
          </div>
        </div>
      </nav>
    );
  }

  private getAuthItem = () => {
    const { currentUser } = this.props;

    if (currentUser.isLoggedIn) {
      return <label className={styles.linkItem}>Welcome! {currentUser.email}</label>;
    } else {
      return (
        <a href={oauthApi.getOauthLoginUrl()} className={styles.linkItem}>
          Login with coinone
        </a>
      );
    }
  };

  private getHangangTemperature = async () => {
    let hangangTemperature: string;
    hangangTemperature = await hangangAPI.getHangangTemperature();

    this.setState({
      hangangTemperature: parseFloat(hangangTemperature),
    });
  };
}

export default connect(mapStateToProps)(Header);
