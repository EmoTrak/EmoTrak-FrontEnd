import { useEffect, useState } from "react";
import LoginForm from "../features/login/components/LoginForm";
import Tutorial from "../features/login/components/Tutorial";
import Landing from "../features/login/components/Landing";
import { LoginPageWrapper } from "../features/login/styles/LoginFormStyle";

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
    <LoginPageWrapper>
      {viewportWidth < 1024 && <Landing />}
      {viewportWidth >= 1024 && (
        <>
          <Tutorial />
          <LoginForm />
        </>
      )}
    </LoginPageWrapper>
  );
};

export default Login;
