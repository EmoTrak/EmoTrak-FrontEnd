import { useNavigate } from "react-router-dom";
import guest from "../lib/api/guest";
import { useQuery } from "@tanstack/react-query";
import { setCookie } from "../utils/cookies";
import { keys } from "../data/queryKey/keys";
import { HOME_PAGE } from "../data/routes/urls";
import Loading from "../components/Loading";
import Error from "../components/Error";

const RedirectGoogle = () => {
  const navigate = useNavigate();

  const code: string | null = new URL(window.location.href).searchParams.get(
    "code"
  );
  const scope = "email%20profile";

  const authGoogleCode = useQuery({
    queryKey: [keys.GET_GOOGLE_LOGIN],
    queryFn: async () => {
      return await guest.get(`/google/callback?code=${code}&scope=${scope}`);
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
      });
      setCookie("token", token, {
        path: "/",
        maxAge: 1740,
      });
      navigate(HOME_PAGE);
    },
  });

  if (authGoogleCode.isError) {
    return <Error />;
  }

  return <Loading />;
};

export default RedirectGoogle;
