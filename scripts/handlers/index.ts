import HandlerWrapper from "./handlerWrapper";
// List of handlers
import render from "./frontRender";
import getAccessToken from "./getAccessToken";

const handlers = {
  render: HandlerWrapper.safelyWrap(render),
  getAccessToken: getAccessToken,
};

export = handlers;
