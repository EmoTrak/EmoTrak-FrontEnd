export const DETAIL_PAGE = "/detail";
export const LOGIN_PAGE = "/login";
export const CHART_PAGE = "/chart";
export const SIGN_UP_PAGE = "/signup";
export const IMAGE_POST_PAGE = "/image-post";
export const DRAW_POST_PAGE = "/draw-post";
export const COMMUNITY_PAGE = "/community";
export const EDIT_PAGE = "/edit";

// 카카오 소셜로그인 관련
export const KAKAO_REST_API_KEY = "07f88dbc408f08bcd7e1bd0b2ca3c993";
export const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
