import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE } from "../data/routes/urls";
import { IPayload, RouterProps } from "../data/type/type";

export const ProtectedRoute = ({
  token,
  isAuthenticated,
  isAdminAuthenticated,
  isAuthAdmin,
  children,
  AlreadyLogin,
  refreshToken,
}: RouterProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthAdmin && !isAdminAuthenticated) {
      alert("권한이없습니다.");
      navigate(LOGIN_PAGE);
    }
    if (AlreadyLogin && refreshToken) {
      navigate(HOME_PAGE);
    }
    if (!isAuthenticated) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate(LOGIN_PAGE);
    }
  }, []);

  return <>{children}</>;
};
