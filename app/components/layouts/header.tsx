import * as React from "react";
import { Link } from "react-router-dom";

const styles = require("./header.scss");

interface IHeaderComponentProps {}

class Header extends React.PureComponent<IHeaderComponentProps, {}> {
  public render() {
    return (
      <nav className={styles.navbar}>
        <Link to="/">Chart</Link>
        <Link to="/drawing">Drawing</Link>
      </nav>
    );
  }
}

export default Header;
