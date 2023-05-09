import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE, SIGN_UP_PAGE } from "../data/routes/urls";
import { IPayload, RouterProps } from "../data/type/type";
import { getCookie } from "../utils/cookies";

export const ProtectedRoute = ({
  isAuthAdmin,
  children,
  isLogin,
  isPublic,
}: RouterProps) => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");
  const location = useLocation();
  const pathname = location.pathname;

  const token = getCookie("token");
  let payloadJson;
  let payload!: IPayload;
  const payloadB64 = (token || "").split(".")[1];
  if (atob && payloadB64) {
    payloadJson = atob(payloadB64);
  }
  if (payloadJson) {
    payload = JSON.parse(payloadJson);
  }
  const admin = payload?.auth;

  useEffect(() => {
    if (isAuthAdmin && admin === "ADMIN") {
      navigate(pathname);
    } else if (isAuthAdmin && admin !== "ADMIN") {
      alert("권한이없습니다.");
      navigate(LOGIN_PAGE);
    } else if (isPublic) {
      if (
        refreshToken &&
        (pathname === LOGIN_PAGE || pathname === SIGN_UP_PAGE)
      ) {
        navigate(HOME_PAGE);
      } else {
        navigate(pathname);
      }
    } else if (isLogin && !refreshToken) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate(LOGIN_PAGE);
    } else if (!isLogin && !refreshToken) {
      navigate(LOGIN_PAGE);
    }

    return () => {};
  }, [refreshToken, pathname, token]);

  return <>{children}</>;
};
