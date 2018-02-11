import * as React from "react";

const styles = require("./userInformation.scss");

export interface IUserInformationProps {
  isLoggedIn: boolean;
}

const UserInformation = (props: IUserInformationProps) => {
  const { isLoggedIn } = props;
  if (!isLoggedIn) {
    return <div className={styles.userInformationContainer}>First, login with coinone!</div>;
  }
  return <div className={styles.userInformationContainer}>userInformation</div>;
};

export default UserInformation;
