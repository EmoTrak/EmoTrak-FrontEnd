import { ReactElement, useEffect } from "react";
import { IPayload, RouterProps } from "../data/type/d2";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({
  token,
  isAuthenticated,
  pathname,
  isAdminAuthenticated,
  isAuthAdmin,
  children,
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
      console.log(isAdminAuthenticated);
      alert("권한이없습니다.");
      nav("/");
    }
  }, []);
  if (!isAuthenticated) {
    alert("로그인이 필요한 서비스 입니다.");
    nav("/login");
  }

  return children;
};
