import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { HOME_PAGE } from "../../../data/routes/urls";
import { LoginInfo } from "../../../data/type/type";
import { setCookie } from "../../../utils/cookies";
import user from "../../../lib/api/user";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const changeInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const login = useMutation({
    mutationFn: async (item: LoginInfo) => {
      const data = await user.post(`/users/login`, item);
      return data;
    },
    onSuccess: (data) => {
      const info = data.headers["authorization"];
      const refresh = data.headers["refresh-token"];
      const expire = data.headers["access-token-expire-time"];

      const token = info.split(" ")[1];

      setCookie("token", token, { path: "/", maxAge: 1740 });
      setCookie("refreshToken", refresh, { path: "/", maxAge: 604800 });
      setCookie("expire", expire, { path: "/", maxAge: 604800 });
      navigate(HOME_PAGE);
    },
  });
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate(loginInfo);
  };

  return { loginInfo, submitFormHandler, changeInputHandler };
};
