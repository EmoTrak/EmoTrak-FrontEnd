import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../utils/cookies";
import Flex from "../components/Flex";
import {
  ADMIN,
  CHART_PAGE,
  COMMUNITY_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  MY_PAGE,
} from "../data/routes/urls";
import EmoTrak from "../assets/logo/EmoTrakLogo.webp";
import MobileMenubar from "./MobileMenubar";
import * as St from "../layouts/LayoutStyle";
import { useEffect, useState } from "react";
import { RiInstallLine } from "react-icons/ri";

const Header = () => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");
  const token = getCookie("token");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const logoutUserHandler = () => {
    if (window.confirm("로그아웃하시겠습니까")) {
      removeCookie("token", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
      removeCookie("expire", { path: "/" });
      navigate("/");
    }
  };

  let payloadJson;
  let payload;
  const payloadB64 = (token || "").split(".")[1];
  if (atob && payloadB64) {
    payloadJson = atob(payloadB64);
  }
  if (payloadJson) {
    payload = JSON.parse(payloadJson);
  }

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          alert("설치해 주셔서 감사합니다. 매일 감정을 기록해보세요!");
        } else {
          alert("why...");
        }

        setDeferredPrompt(null);
      });
    }
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <St.Header>
      {refreshToken ? (
        <St.EmoTrakLogo onClick={() => navigate(HOME_PAGE)}>
          <St.LogoImg src={EmoTrak} alt="로고" />
        </St.EmoTrakLogo>
      ) : (
        <St.EmoTrakLogo onClick={() => navigate("/")}>
          <St.LogoImg src={EmoTrak} alt="로고" />
        </St.EmoTrakLogo>
      )}
      <MobileMenubar action={handleInstallClick} />
      {payload?.auth === "ADMIN" ? (
        <St.NavWrapper>
          <Flex row gap={10}>
            <St.PageButton onClick={() => navigate(ADMIN)}>
              관리자페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(COMMUNITY_PAGE)}>
              공유 페이지
            </St.PageButton>

            <St.PageButton onClick={() => navigate(CHART_PAGE)}>
              차트 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(MY_PAGE)}>
              마이페이지
            </St.PageButton>
            <St.PageButton onClick={logoutUserHandler}>로그아웃</St.PageButton>
          </Flex>
        </St.NavWrapper>
      ) : refreshToken ? (
        <St.NavWrapper>
          <Flex row gap={10}>
            <St.PageButton onClick={() => navigate(COMMUNITY_PAGE)}>
              공유 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(HOME_PAGE)}>
              달력 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(CHART_PAGE)}>
              차트 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(MY_PAGE)}>
              마이페이지
            </St.PageButton>
            <St.PageButton onClick={logoutUserHandler}>로그아웃</St.PageButton>
          </Flex>
        </St.NavWrapper>
      ) : (
        <St.NavWrapper>
          <Flex row gap={10}>
            <St.PageButton onClick={handleInstallClick}>
              설치하기
              <RiInstallLine />
            </St.PageButton>
            <St.PageButton onClick={() => navigate(COMMUNITY_PAGE)}>
              공유 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(LOGIN_PAGE)}>
              로그인
            </St.PageButton>
          </Flex>
        </St.NavWrapper>
      )}
    </St.Header>
  );
};

export default Header;
