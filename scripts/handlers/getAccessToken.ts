import * as LambdaProxy from "../interfaces/lambda-proxy";
const axios = require("axios");

export default async function handler(event: LambdaProxy.Event, _context: LambdaProxy.Context) {
  //-post 방식-
  //https://api.coinone.co.kr/oauth/access_token/?app_id=[App_Id]&app_secret=[App_Secret]&request_token=[Request token]
  /*
      *** Response Fields
      imageDataURL: string;
  */
  if (event.body) {
    axios({
      method: "post",
      url: "https://api.coinone.co.kr/oauth/access_token",
      data: {
        appId: "Fred",
        app_secret: "Flintstone",
        request_token: "requestToken",
      },
    })
      .then((response: any) => {
        console.log("success response is ", response);
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: `${response.data.accessToken}.png`,
        };
      })
      .catch((err: any) => {
        console.error(err);
        return {
          statusCode: 500,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      });
  }
}
