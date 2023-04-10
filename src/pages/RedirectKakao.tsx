import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cookies } from "../utils/cookies";
import guest from "../lib/api/guest";

const RedirectKakao = () => {
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    "code"
  );

  const authKakaoCode = async (code: string | null) => {
    const response = await guest.get(`/kakao/callback?code=${code}`);
    const info = response.headers.authorization.split(" ");
    const token = info[1];
    // console.log("responses", response);

    cookies.set("token", token, {
      path: "/",
      maxAge: 3540,
    });
    cookies.set("nickname", response.headers.nickname, {
      path: "/",
      maxAge: 3540,
    });
  };

  useEffect(() => {
    authKakaoCode(code);
    alert("로그인 되었습니다.");
    navigate("/");
    return () => {};
  }, []);

  return <div>RedirectKakao</div>;
};

export default RedirectKakao;
