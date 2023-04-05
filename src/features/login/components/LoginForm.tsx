import React, { useEffect, useState } from "react";
import { LoginInfo } from "../../../data/type/d3";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_PAGE } from "../../../data/routes/urls";
import styled from "styled-components";
import Flex from "../../../components/Flex";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setCookie } from "../../../utils/cookies";

const LoginForm = () => {
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
  const mutation = useMutation(
    async (item: LoginInfo) => {
      const data = await axios.post(
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
    mutation.mutate(loginInfo);
  };

  return (
    <StFormWrapper>
      <form action="" onSubmit={submitFormHandler}>
        <Flex gap={10}>
          <label htmlFor="">
            id
            <input
              type="text"
              name="email"
              value={loginInfo.email}
              onChange={changeInputHandler}
            />
          </label>
          <label htmlFor="">
            password
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={changeInputHandler}
            />
          </label>
          <button type="submit">로그인</button>
        </Flex>
      </form>

      <button type="button" onClick={() => navigate(SIGN_UP_PAGE)}>
        회원가입
      </button>
    </StFormWrapper>
  );
};

export default LoginForm;

const StFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border: 1px solid;
  justify-content: center;
  align-items: center;
`;
