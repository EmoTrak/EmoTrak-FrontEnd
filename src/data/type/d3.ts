export type LoginInfo = {
  email: string;
  password: string;
};

export type SignInfo = LoginInfo & { nickname: string };

export interface Validation {
  email: boolean;
  nickname: boolean;
  password: boolean;
}

export interface CookieOption {
  path: string;
  maxAge?: number;
}

export interface Coordinate {
  x: number;
  y: number;
}
