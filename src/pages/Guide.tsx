import { useEffect } from "react";
import Tutorial from "../features/login/components/Tutorial";
import Landing from "../features/login/components/Landing";
import { LoginPageWrapper } from "../features/login/styles/LoginFormStyle";
import { useWindowSize } from "../hooks/useWindowSize";

const Guide = () => {
  const { resizeHandler, desktop } = useWindowSize();
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <LoginPageWrapper>{desktop ? <Tutorial /> : <Landing />}</LoginPageWrapper>
  );
};

export default Guide;
