import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookies";
import guest from "../lib/api/guest";
import { useMutation } from "@tanstack/react-query";

const RedirectKakao = () => {
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    "code"
  );

  const authKakaoCode = useMutation(
    async (code: string | null) => {
      const data = await await guest.get(`/kakao/callback?code=${code}`);
      return data;
    },
    {
      onSuccess(data) {
        const info = data.headers.authorization.split(" ");
        const token = info[1];
        setCookie("token", token, { path: "/", maxAge: 3540 });
        setCookie("nickname", data.headers.nickname, {
          path: "/",
          maxAge: 3540,
        });
        navigate("/");
      },
      onError(err) {},
    }
  );

  useEffect(() => {
    authKakaoCode.mutate(code);
  }, []);

  return <div>RedirectKakao</div>;
};

export default RedirectKakao;
