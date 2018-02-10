import * as React from "react";
import Icon from "../../icons/index";

const styles = require("./footer.scss");

interface IFooterComponentProps {}

class Footer extends React.PureComponent<IFooterComponentProps, {}> {
  public render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.leftBox}>
            <Icon icon="FOOTER_LOGO" className={styles.footerLogo} />
            Copyright © 2017 Coinone Inc. All rights reserved.
          </div>
          <div className={styles.rightBox}>
            <a href="mailto:academey@gmail.com" target="_blank" className={styles.link}>
              Contact Me
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
