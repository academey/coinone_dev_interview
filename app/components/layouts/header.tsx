import * as React from "react";
import { Link } from "react-router-dom";
import Icon from "../../icons/index";
import oauthApi from "../../api/oauth";
import hangangAPI from "../../api/hangang";

const styles = require("./header.scss");

interface IHeaderComponentProps {}
interface IHeaderComponentState {
  hangangTemperature: number;
}

class Header extends React.PureComponent<IHeaderComponentProps, IHeaderComponentState> {
  constructor(props: IHeaderComponentProps) {
    super(props);

    this.state = {
      hangangTemperature: null,
    };
  }

  public componentDidMount() {
    this.getHangangTemperature();
  }

  private getHangangTemperature = async () => {
    let hangangTemperature: string;
    hangangTemperature = await hangangAPI.getHangangTemperature();

    this.setState({
      hangangTemperature: parseFloat(hangangTemperature),
    });
  };

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
            <Link className={styles.linkItem} to="/drawing">
              Expectation
            </Link>
            <label className={styles.hangangTemperature}>{`${this.state.hangangTemperature}°C`}</label>
          </div>
          <div className={styles.rightBox}>
            <a href={oauthApi.getOauthLoginUrl()} className={styles.linkItem}>
              Login with coinone
            </a>
            <a href="https://github.com/academey/coinone_dev_interview" target="_blank" className={styles.linkItem}>
              Github
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
