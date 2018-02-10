import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { ISignInStateRecord } from "./records";
import { IAppState } from "../../../reducers/index";
import { InputBox } from "../../common/inputBox/index";
import * as Actions from "./actions";
import { parse } from "qs";
import { RouteProps } from "react-router";
const styles = require("./signIn.scss");

interface ISignInContainerProps extends DispatchProp<ISignInContainerMappedState> {
  signInState: ISignInStateRecord;
  routing: RouteProps;
}

interface ISignInContainerMappedState {
  signInState: ISignInStateRecord;
  routing: RouteProps;
}

function mapStateToProps(state: IAppState) {
  return {
    signInState: state.signIn,
    routing: state.routing,
  };
}

interface ISignInSearchParams {
  request_token?: string;
}

class SignIn extends React.PureComponent<ISignInContainerProps, {}> {
  public componentDidMount() {
    const { dispatch } = this.props;
    const searchString = this.getCurrentSearchParamsString();
    const searchParams: ISignInSearchParams = this.getParsedSearchParamsObject(searchString);
    const requestToken = searchParams.request_token;

    if (!!requestToken) {
      dispatch(Actions.getAuthorizeCode(requestToken));
    }
  }

  private getCurrentSearchParamsString = () => {
    const { routing } = this.props;
    return routing.location.search;
  };

  private getParsedSearchParamsObject = (searchString: string): ISignInSearchParams => {
    return parse(searchString, { ignoreQueryPrefix: true });
  };

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
      <div className={styles.signInContainer}>
        <div className={styles.title}>Sign IN</div>
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
