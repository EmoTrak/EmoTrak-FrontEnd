import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import guest from "../lib/api/guest";
import { useQuery } from "@tanstack/react-query";
import { getCookie, setCookie } from "../utils/cookies";
import { keys } from "../data/queryKeys/keys";
import { HOME_PAGE } from "../data/routes/urls";

const RedirectGoogle = () => {
  const navigate = useNavigate();

  const token = getCookie("token");
  const code: string | null = new URL(window.location.href).searchParams.get(
    "code"
  );
  const scope = "email%20profile";

  const getGoogleLogin = useCallback(async () => {
    return await guest.get(`/google/callback?code=${code}&scope=${scope}`);
  }, []);

  const authGoogleCode = useQuery(
    [`${keys.GET_GOOGLE_LOGIN}`],
    getGoogleLogin,
    {
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
    }
  );

  useEffect(() => {
    if (token) {
      navigate(`${HOME_PAGE}`);
    }
  }, [token]);

  if (authGoogleCode.isLoading) {
    return <div>구글 로그인중입니다...</div>;
  }

  if (authGoogleCode.isError) {
    navigate(-2);
    return <div>에러</div>;
  }

  return <div>RedirectGoogle</div>;
};

export default RedirectGoogle;
