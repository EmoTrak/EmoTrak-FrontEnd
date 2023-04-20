import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../utils/cookies";
import { LoginInfo } from "../../../data/type/d3";
import guest from "../../../lib/api/guest";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { HOME_PAGE } from "../../../data/routes/urls";

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

  const login = useMutation(
    async (item: LoginInfo) => {
      const data = await guest.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        item
      );
      return data;
    },
    {
      onSuccess(data) {
        const info = data.headers["authorization"];
        const refresh = data.headers["refresh-token"];
        const expire = data.headers["access-token-expire-time"];

        const token = info.split(" ")[1];

        setCookie("token", token, { path: "/", maxAge: 1740 });
        setCookie("refreshToken", refresh, { path: "/", maxAge: 604800 });
        setCookie("expire", expire, { path: "/", maxAge: 604800 });
        navigate(`${HOME_PAGE}`);
      },
      onError() {
        alert("아이디와 비밀번호를 확인해주세요 !");
        setLoginInfo({ email: "", password: "" });
      },
    }
  );
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate(loginInfo);
  };

  return { loginInfo, submitFormHandler, changeInputHandler };
};
