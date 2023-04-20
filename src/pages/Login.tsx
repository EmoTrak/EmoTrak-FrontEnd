import { useEffect } from "react";
import LoginForm from "../features/login/components/LoginForm";
import Tutorial from "../features/login/components/Tutorial";
import styled from "styled-components";
import { getCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const token = getCookie("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <StLoginPageWrapper>
      <Tutorial />
      <LoginForm />
    </StLoginPageWrapper>
  );
};

export default Login;

export const StLoginPageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  justify-content: center;
`;
