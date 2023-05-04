import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE } from "../data/routes/urls";
import { RouterProps } from "../data/type/type";
import { getCookie } from "../utils/cookies";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  useEffect(() => {
    // 어드민이 트루고, 페이로드 없을때
    if (isAuthAdmin && !isAdminAuthenticated) {
      alert("권한이없습니다.");
      navigate(LOGIN_PAGE);
      queryClient.clear();
    }
    // 공유 페이지
    else if (isPublic) {
      navigate(pathname);
    }
    // 로그인된 상태
    else if (refreshToken && !isLogin) {
      navigate(HOME_PAGE);
    }
    // 게스트가 유저페이지에 입장할때
    else if (isLogin && !refreshToken) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate(LOGIN_PAGE);
      queryClient.clear();
    }
    // 게스트 만 봐야하는 페이지
    else if (!isLogin && !refreshToken) {
      navigate(LOGIN_PAGE);
      queryClient.clear();
    }

    return () => {};
  }, [refreshToken]);

  return <>{children}</>;
};
