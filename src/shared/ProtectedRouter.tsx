import { ReactElement, useEffect } from "react";
import { IPayload, RouterProps } from "../data/type/d2";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../data/routes/urls";

export const ProtectedRoute = ({
  token,
  isAuthenticated,
  isAdminAuthenticated,
  isAuthAdmin,
  children,
  AlreadyLogin,
}: RouterProps): ReactElement | null => {
  const nav = useNavigate();
  let payloadJson;
  let payload!: IPayload;
  const [headerB64, payloadB64, signatureB64] = (token || "").split(".");
  if (typeof atob !== undefined && payloadB64) {
    payloadJson = atob(payloadB64);
  }
  if (payloadJson !== undefined) {
    payload = JSON.parse(payloadJson);
  }
  useEffect(() => {
    if (payload?.auth !== undefined && payload?.auth === "ADMIN") {
    } else if (isAuthAdmin && !isAdminAuthenticated) {
      alert("권한이없습니다.");
      nav(`/`);
    }
    if (AlreadyLogin && token) {
      console.log("하이");
      nav(`${HOME_PAGE}`);
    }
  }, []);
  if (!isAuthenticated) {
    alert("로그인이 필요한 서비스 입니다.");
    nav("/");
  }

  return children;
};
