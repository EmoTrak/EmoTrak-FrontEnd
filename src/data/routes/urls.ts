export const HOME_PAGE = "/home";
export const SIGN_UP_PAGE = "/signup";
export const MY_PAGE = "/mypage";
export const IMAGE_POST_PAGE = "/image-post";
export const DRAW_POST_PAGE = "/draw-post";
export const DETAIL_PAGE = "/detail";
export const IMAGE_EDIT_PAGE = "/image-edit";
export const DRAW_EDIT_PAGE = "/draw-edit";
export const CHART_PAGE = "/chart";
export const COMMUNITY_PAGE = "/community";
export const COMMUNITY_DETAIL = "/community";
export const OAUTH_KAKAO = "/oauth/kakao";
export const OAUTH_NAVER = "/oauth/naver";
export const OAUTH_GOOGLE = "/oauth/google";
export const ADMIN = "/admin";
export const ADMIN_POST = "/adminpost";
export const ADMIN_COMMENT = "/admincomment";
export const PRIVACY_POLICY = "/privacy-policy";
export const LOGIN_PAGE = "/login";

// 카카오 소셜로그인 관련
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
const NAVER_STATE = process.env.REACT_APP_NAVER_STATE;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline`;
