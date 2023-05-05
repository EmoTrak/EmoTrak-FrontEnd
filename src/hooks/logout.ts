import { removeCookie } from "../utils/cookies";

export const logout = () => {
  removeCookie("token", { path: "/" });
  removeCookie("refreshToken", { path: "/" });
  removeCookie("expire", { path: "/" });
};
