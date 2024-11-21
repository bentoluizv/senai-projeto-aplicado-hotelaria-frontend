import { getCurrentUserAction } from "./getCurrentUserAction";
import { loginAction } from "./loginAction";
import { refreshTokenAction } from "./refreshTokenAction";

export const server = {
  refreshTokenAction,
  getCurrentUserAction,
  loginAction,
};
