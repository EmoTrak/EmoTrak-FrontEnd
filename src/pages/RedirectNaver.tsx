import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import guest from "../lib/api/guest";
import { useQuery } from "@tanstack/react-query";
import { getCookie, setCookie } from "../utils/cookies";

const RedirectNaver = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getCookie("token");
  const code = location.search.split("=")[1];
  const state = location.search.split("=")[2];

  const getNaverLogin = useCallback(async () => {
    return await guest.get(`/naver/callback?code=${code}&state=${state}`);
  }, []);

  const authNaverCode = useQuery([], getNaverLogin, {
    retry: 1,
    onSuccess(data) {
      const info = data.headers.authorization.split(" ");
      const refresh = data.headers["refresh-token"];
      const expire = data.headers["access-token-expire-time"];
      const token = info[1];
      setCookie("refreshToken", refresh, { path: "/", maxAge: 604800 });
      setCookie("expire", expire, { path: "/", maxAge: 604800 });
      setCookie("token", token, { path: "/", maxAge: 1740 });
    },
  });

  useEffect(() => {
    if (token) {
      navigate(-2);
    }
  }, [token]);

  if (authNaverCode.isLoading) {
    return <div>네이버 로그인중입니다...</div>;
  }

  if (authNaverCode.isError) {
    navigate(-2);
    return <div>에러</div>;
  }

  return <div>RedirectNaver</div>;
};

export default RedirectNaver;
