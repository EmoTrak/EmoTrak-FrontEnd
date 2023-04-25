import LoginForm from "../features/login/components/LoginForm";
import Tutorial from "../features/login/components/Tutorial";
import styled from "styled-components";
import Landing from "../features/login/components/Landing";
import { useEffect, useState } from "react";

const Login = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <StLoginPageWrapper>
      {viewportWidth < 1024 ? (
        <>
          <Landing />
        </>
      ) : null}
      {viewportWidth >= 1024 ? (
        <>
          <Tutorial />
          <LoginForm />
        </>
      ) : null}
    </StLoginPageWrapper>
  );
};

export default Login;

export const StLoginPageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  justify-content: center;
`;
