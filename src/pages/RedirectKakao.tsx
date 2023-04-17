import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookies";
import guest from "../lib/api/guest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { keys } from "../data/queryKeys/keys";

const RedirectKakao = () => {
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    "code"
  );
  const token = getCookie("token");

  const getKakaoLogin = useCallback(async () => {
    return await guest.get(`/kakao/callback?code=${code}`);
  }, []);

  const authKakaoCode = useQuery([`${keys.GET_KAKAO_LOGIN}`], getKakaoLogin, {
    retry: 1,
    onSuccess(data) {
      const info = data.headers.authorization.split(" ");
      const refresh = data.headers["refresh-token"];
      const expire = data.headers["access-token-expire-time"];
      const token = info[1];
      setCookie("token", token, { path: "/", maxAge: 1740 });
      setCookie("refreshToken", refresh, { path: "/", maxAge: 604800 });
      setCookie("expire", expire, { path: "/", maxAge: 604800 });
    },
  });

  useEffect(() => {
    if (token) {
      navigate(-2);
    }
  }, [token]);

  if (authKakaoCode.isLoading) {
    return <div>카카오 로그인중입니다...</div>;
  }

  if (authKakaoCode.isError) {
    navigate(-2);
    return <div>에러</div>;
  }
  return <div>RedirectKakao</div>;
};

export default RedirectKakao;
