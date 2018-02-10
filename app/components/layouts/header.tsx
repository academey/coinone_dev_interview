import * as React from "react";
import { Link } from "react-router-dom";
import Icon from "../../icons/index";
import { COINONE_APP_ID } from "../../api/baseApi";

const styles = require("./header.scss");

interface IHeaderComponentProps {}

class Header extends React.PureComponent<IHeaderComponentProps, {}> {
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
          </div>
          <div className={styles.rightBox}>
            <a href={`https://coinone.co.kr/account/login/?app_id=${COINONE_APP_ID}`} className={styles.linkItem}>
              Login with Coinone
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
