import React, { useEffect } from "react";
import LoginForm from "../features/login/components/LoginForm";
import Tutorial from "../features/login/components/Tutorial";
import styled from "styled-components";
import { getCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import Flex from "../components/Flex";

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const token = getCookie("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <StLoginPageWrapper>
      <Flex row>
        <Tutorial />
        <LoginForm />
      </Flex>
    </StLoginPageWrapper>
  );
};

export default Login;

const StLoginPageWrapper = styled.div`
  width: 100%;
  height: 78vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
