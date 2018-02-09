import EnvChecker from "../helpers/envChecker";

const DEV_API_HOST = "https://d2l4c5evd6ubxk.cloudfront.net";
const ALPHA_API_HOST = "https://d24lq4alvzgsbn.cloudfront.net";

export default function getAPIHost() {
  if (EnvChecker.isStage()) {
    return ALPHA_API_HOST;
  } else {
    return DEV_API_HOST;
  }
}
