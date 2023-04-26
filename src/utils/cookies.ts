import Cookies from "universal-cookie";
import { CookieOption } from "../data/type/type";

export const cookies = new Cookies();

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setCookie = (
  name: string,
  value: string,
  option: CookieOption
) => {
  return cookies.set(name, value, { ...option });
};

export const removeCookie = (name: string, option?: CookieOption) => {
  return cookies.remove(name, { ...option });
};
