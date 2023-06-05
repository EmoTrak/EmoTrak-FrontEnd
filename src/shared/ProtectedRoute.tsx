import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE, SIGN_UP_PAGE } from "../data/routes/urls";
import { RouterProps } from "../data/type/type";
import { getCookie } from "../utils/cookies";

export const ProtectedRoute = ({
  admin,
  isAuthAdmin,
  children,
  isLogin,
  isPublic,
}: RouterProps) => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (isAuthAdmin && admin === "ADMIN") {
      navigate(pathname);
    } else if (isAuthAdmin && admin !== "ADMIN") {
      alert("권한이없습니다.");
      navigate(LOGIN_PAGE);
    } else if (isPublic) {
      if (refreshToken && (pathname === LOGIN_PAGE || pathname === SIGN_UP_PAGE)) {
        navigate(HOME_PAGE);
      }
    } else if (isLogin && !refreshToken) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate(LOGIN_PAGE);
    } else if (!isLogin && !refreshToken) {
      navigate(LOGIN_PAGE);
    }

    return () => {};
  }, [refreshToken, pathname, admin]);

  return <>{children}</>;
};
