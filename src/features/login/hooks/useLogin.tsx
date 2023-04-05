import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../utils/cookies";
import { LoginInfo } from "../../../data/type/d3";
import guest from "../../../lib/api/guest";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

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
        const info = data.headers.authorization;
        const token = info.split(" ")[1];
        setCookie("token", token, { path: "/", maxAge: 3540 });
        navigate("/");
      },
      onError(err) {
        alert("아이디와 비밀번호를 확인해주세요 !");
        setLoginInfo({ email: "", password: "" });
      },
    }
  );
  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate(loginInfo);
  };

  return { loginInfo, submitFormHandler, changeInputHandler };
};
