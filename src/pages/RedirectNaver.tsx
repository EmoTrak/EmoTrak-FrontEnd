import { useLocation, useNavigate } from "react-router-dom";
import guest from "../lib/api/guest";
import { useQuery } from "@tanstack/react-query";
import { setCookie } from "../utils/cookies";
import { keys } from "../data/queryKey/keys";
import { HOME_PAGE } from "../data/routes/urls";
import Loading from "../components/Loading";
import Error from "../components/Error";

const RedirectNaver = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const code = location.search.split("=")[1];
  const state = location.search.split("=")[2];

  const authNaverCode = useQuery({
    queryKey: [keys.GET_NAVER_LOGIN],
    queryFn: async () => {
      const data = await guest.get(
        `/naver/callback?code=${code}&state=${state}`
      );
      return data;
    },
    retry: 1,
    onSuccess: (data) => {
      const info = data.headers.authorization.split(" ");
      const refresh = data.headers["refresh-token"];
      const expire = data.headers["access-token-expire-time"];
      const token = info[1];
      setCookie("refreshToken", refresh, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("expire", expire, {
        path: "/",
        maxAge: 604800,
        secure: true,
        httpOnly: true,
      });
      setCookie("token", token, {
        path: "/",
        maxAge: 1740,
        secure: true,
        httpOnly: true,
      });
      navigate(HOME_PAGE);
    },
  });

  if (authNaverCode.isError) {
    return <Error />;
  }

  return <Loading />;
};

export default RedirectNaver;
