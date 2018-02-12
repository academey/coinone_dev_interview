import * as React from "react";
import Icon from "../../icons";

const styles = require("./footer.scss");

interface IFooterComponentProps {}

class Footer extends React.PureComponent<IFooterComponentProps, {}> {
  public render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.leftBox}>
            <Icon icon="FOOTER_LOGO" className={styles.footerLogo} />
            <label>
              <label className={styles.bold}>(주)코인원 코딩 테스트</label> | 대표 박현준 | 사업자등록번호 777-77-7777 |
              통신판매업신고 X
            </label>
            <label>
              <label className={styles.bold}>공식 이메일</label>{" "}
              <a href="mailto:academey@gmail.com" target="_blank">
                academey@gmail.com
              </a>
              (고객상담/마케팅/제휴/상장 외 연락)
            </label>
            <div className={styles.copyright}>
              Copyright © 2017 Coinone Inc. All rights reserved.<br />
            </div>
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
