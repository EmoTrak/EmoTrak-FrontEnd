import { useEffect, useState } from "react";
import LoginForm from "../features/login/components/LoginForm";
import Tutorial from "../features/login/components/Tutorial";
import Landing from "../features/login/components/Landing";
import { LoginPageWrapper } from "../features/login/styles/LoginFormStyle";
import { useWindowSize } from "../hooks/useWindowSize";

const Login = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const { resizeHandler, desktop } = useWindowSize();

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          alert("매일 감정을 기록해보세요!");
        } else {
          console.log("");
        }

        setDeferredPrompt(null);
      });
    }
  }, [deferredPrompt]);

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

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
