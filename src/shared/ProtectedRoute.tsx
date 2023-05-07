import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE, SIGN_UP_PAGE } from "../data/routes/urls";
import { RouterProps } from "../data/type/type";
import { getCookie } from "../utils/cookies";

export const ProtectedRoute = ({
  isAdminAuthenticated,
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
    if (isAuthAdmin && !isAdminAuthenticated) {
      alert("권한이없습니다.");
      navigate(LOGIN_PAGE);
    } else if (isPublic) {
      if ((refreshToken && pathname === LOGIN_PAGE) || pathname === SIGN_UP_PAGE) {
        navigate(HOME_PAGE);
      } else {
        navigate(pathname);
      }
    } else if (isLogin && !refreshToken) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate(LOGIN_PAGE);
    } else if (!isLogin && !refreshToken) {
      alert("d");
      navigate(LOGIN_PAGE);
    }

    return () => {};
  }, [refreshToken, pathname]);

  return <>{children}</>;
};
