import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookies";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../data/queryKey/keys";
import { HOME_PAGE } from "../data/routes/urls";
import Loading from "../components/Loading";
import Error from "../components/Error";
import user from "../lib/api/user";

const RedirectKakao = () => {
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    "code"
  );

  const authKakaoCode = useQuery({
    queryKey: [keys.GET_KAKAO_LOGIN],
    queryFn: async () => {
      return await user.get(`/kakao/callback?code=${code}`);
    },
    retry: 1,
    onSuccess: (data) => {
      const info = data.headers.authorization.split(" ");
      const refresh = data.headers["refresh-token"];
      const expire = data.headers["access-token-expire-time"];
      const token = info[1];
      setCookie("token", token, {
        path: "/",
        maxAge: 1740,
      });
      setCookie("refreshToken", refresh, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("expire", expire, {
        path: "/",
        maxAge: 604800,
      });
      navigate(HOME_PAGE);
    },
  });

  if (authKakaoCode.isError) {
    return <Error />;
  }
  return <Loading />;
};

export default RedirectKakao;
