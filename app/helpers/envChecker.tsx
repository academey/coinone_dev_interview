const IP_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
const STAGE_SERVER_HOST_NAME = "d24lq4alvzgsbn.cloudfront.net";

export default class EnvChecker {
  public static isDev(): boolean {
    if (!EnvChecker.isServer()) {
      return (
        window.location.hostname &&
        (window.location.hostname.includes("localhost") ||
          window.location.hostname.includes("lvh.me") ||
          IP_REGEX.test(window.location.hostname))
      );
    }
    return false;
  }

  public static isServer(): boolean {
    return typeof window === "undefined";
  }

  public static isStage(): boolean {
    return window.location.hostname && window.location.hostname.includes(STAGE_SERVER_HOST_NAME);
  }
}
