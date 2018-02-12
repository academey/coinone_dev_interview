import * as React from "react";
const styles = require("./expectation.scss");

export interface IExpectationContainerProps {}

class ExpectationContainer extends React.Component<IExpectationContainerProps, {}> {
  public render() {
    return (
      <div className={styles.expectationContainer}>
        <h1>TODO</h1>
      </div>
    );
  }
}

export default ExpectationContainer;
