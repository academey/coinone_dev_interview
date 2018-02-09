import * as React from "react";

const styles = require("./header.scss");

interface IHeaderComponentProps {}

class Header extends React.PureComponent<IHeaderComponentProps, {}> {
  public render() {
    return <nav className={styles.navbar}>header</nav>;
  }
}

export default Header;
