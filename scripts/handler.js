const bundle = require("./bundle");
const axios = require("axios");

module.exports.ssr = bundle.ssr.handler;

module.exports.getAccessToken = (event, context, callback) => {
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
        request_token: "requestToken"
      }
    })
      .then(response => {
        console.log("success response is ", response);
        context.succeed({
          statusCode: 200,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: `${response.data.accessToken}.png`
        });
      })
      .catch(err => {
        console.error(err);
        callback(null, {
          statusCode: 500,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          }
        });
      });
  }
};
