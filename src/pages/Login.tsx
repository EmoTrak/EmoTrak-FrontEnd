import { useEffect } from "react";
import LoginForm from "../features/login/components/LoginForm";
import Tutorial from "../features/login/components/Tutorial";
import Landing from "../features/login/components/Landing";
import { LoginPageWrapper } from "../features/login/styles/LoginFormStyle";
import { useWindowSize } from "../hooks/useWindowSize";

const Login = () => {
  const { resizeHandler, desktop } = useWindowSize();

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <LoginPageWrapper>
      {!desktop && <Landing />}
      {desktop && (
        <>
          <Tutorial />
          <LoginForm />
        </>
      )}
    </LoginPageWrapper>
  );
};

export default Login;
