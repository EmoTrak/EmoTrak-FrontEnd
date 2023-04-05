import React from "react";
import LoginForm from "../features/login/components/LoginForm";
import Tutorial from "../features/login/components/Tutorial";
import styled from "styled-components";

const Login = (): JSX.Element => {
  return (
    <StLoginPageWrapper>
      <Row>
        <Tutorial />
        <LoginForm />
      </Row>
    </StLoginPageWrapper>
  );
};

export default Login;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const StLoginPageWrapper = styled.div`
  width: 100%;
  height: 78vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
