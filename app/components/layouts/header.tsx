import * as React from "react";
import { Link } from "react-router-dom";
import Icon from "../../icons/index";

const styles = require("./header.scss");

interface IHeaderComponentProps {}

class Header extends React.PureComponent<IHeaderComponentProps, {}> {
  public render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.headerContainer}>
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
      </nav>
    );
  }
}

export default Header;
