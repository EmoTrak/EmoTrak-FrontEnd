// 엥인서 모듈 파일

export type LoginInfo = {
  email: string;
  password: string;
};

export type SignInfo = LoginInfo & { nickname: string };

export type Validation = {
  email: boolean;
  nickname: boolean;
  password: boolean;
};

export type CookieOption = {
  path: string;
  maxAge?: number;
};
