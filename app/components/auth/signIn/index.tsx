import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { ISignInStateRecord } from "./records";
import { IAppState } from "../../../reducers/index";
import { InputBox } from "../../common/inputBox/index";
import * as Actions from "./actions";
const styles = require("./signIn.scss");

interface ISignInContainerProps extends DispatchProp<ISignInContainerMappedState> {
  signInState: ISignInStateRecord;
}

interface ISignInContainerMappedState {
  signInState: ISignInStateRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    signInState: state.signIn
  };
}

class SignIn extends React.PureComponent<ISignInContainerProps, {}> {
  private changeEmailInput = (email: string) => {
    const { dispatch } = this.props;
    dispatch(Actions.changeEmailInput(email));
  };

  private changePasswordInput = (password: string) => {
    const { dispatch } = this.props;
    dispatch(Actions.changePasswordInput(password));
  };

  private signIn = () => {
    const { dispatch } = this.props;

    dispatch(Actions.changePasswordInput(""));
  };

  public render() {
    const { email, password } = this.props.signInState;
    return (
      <div className={styles.navbar}>
        SignIn
        <form onSubmit={this.signIn}>
          Email:
          <InputBox onChangeFunc={this.changeEmailInput} type="normal" defaultValue={email} />
          Password:
          <InputBox onChangeFunc={this.changePasswordInput} type="normal" defaultValue={password} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SignIn);
