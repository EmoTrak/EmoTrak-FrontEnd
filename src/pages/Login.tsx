import LoginForm from "../features/login/components/LoginForm";
import Tutorial from "../features/login/components/Tutorial";
import styled from "styled-components";

const Login = () => {
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
