import React, { useState } from "react";
import { LoginInfo } from "../../../data/type/d3";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_PAGE } from "../../../data/routes/urls";
import styled from "styled-components";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    id: "",
    password: "",
  });

  const changeInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StFormWrapper>
      <form action="" onSubmit={submitFormHandler}>
        <Column>
          <label htmlFor="">
            id
            <input
              type="text"
              name="id"
              value={loginInfo.id}
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
        </Column>
      </form>

      <button type="button" onClick={() => navigate(SIGN_UP_PAGE)}>
        회원가입
      </button>
    </StFormWrapper>
  );
};

export default LoginForm;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const StFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border: 1px solid;
  justify-content: center;
  align-items: center;
`;
