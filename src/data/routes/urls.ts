export const DETAIL_PAGE = "/detail";
export const LOGIN_PAGE = "/login";
export const CHART_PAGE = "/chart";
export const SIGN_UP_PAGE = "/signup";
export const IMAGE_POST_PAGE = "/image-post";
export const DRAW_POST_PAGE = "/draw-post";
export const COMMUNITY_PAGE = "/community";
export const EDIT_PAGE = "/edit";
export const MY_PAGE = "/mypage";
export const ADMIN = "/admin";
export const ADMIN_POST = "/adminpost";
export const ADMIN_COMMENT = "/admincomment";

// 카카오 소셜로그인 관련
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
const NAVER_SECRET_KEY = process.env.REACT_APP_NAVER_SECRET;
const NAVER_STATE = process.env.REACT_APP_NAVER_STATE;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
