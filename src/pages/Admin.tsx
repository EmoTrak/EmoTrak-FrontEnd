import React, { useEffect } from "react";
import styled from "styled-components";
import AdminNavbar from "../features/admin/components/AdminNavbar";
import { getCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import { IPayload } from "../data/type/d2";

const Admin = (): JSX.Element => {
  const nav = useNavigate();
  const token = getCookie("token");
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
    if (payload?.auth === undefined || payload?.auth !== "ADMIN") {
      alert("권한이 없습니다!");
      nav("/");
    }
  }, []);

  return (
    <Wrapper>
      <AdminNavbar />
    </Wrapper>
  );
};

export default Admin;

const Wrapper = styled.div`
  width: 100px;
  height: 100vh;
`;
