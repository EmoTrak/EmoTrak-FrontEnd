import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../utils/cookies";
import Flex from "../components/Flex";
import {
  ADMIN,
  CHART_PAGE,
  COMMUNITY_PAGE,
  HOME_PAGE,
  MY_PAGE,
} from "../data/routes/urls";
import EmoTrak from "../assets/logo/EmoTrakLogo.png";
import { useState } from "react";
import { device, themeColor } from "../utils/theme";
import MobileMenubar from "./MobileMenubar";
import { IoIosArrowBack } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const refreshToken = getCookie("refreshToken");

  const logoutUserHandler = () => {
    if (window.confirm("로그아웃하시겠습니까")) {
      removeCookie("token", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
      removeCookie("expire", { path: "/" });
      navigate("/");
      setIsLogin(true);
    }
  };

  let payloadJson;
  let payload;
  const payloadB64 = (refreshToken || "").split(".")[1];
  if (atob && payloadB64) {
    payloadJson = atob(payloadB64);
  }
  if (payloadJson) {
    payload = JSON.parse(payloadJson);
  }

  return (
    <StHeader>
      <BackOfPage onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </BackOfPage>
      <EmoTrakLogo onClick={() => navigate(HOME_PAGE)}>
        <LogoImg src={EmoTrak} alt="로고" />
      </EmoTrakLogo>
      <MobileMenubar logout={logoutUserHandler} />
      {payload?.auth === "ADMIN" ? (
        <NavWrapper>
          <Flex row gap={10}>
            <PageButton onClick={() => navigate(ADMIN)}>관리자페이지</PageButton>
            <PageButton onClick={() => navigate(MY_PAGE)}>마이페이지</PageButton>
            <PageButton onClick={() => navigate(COMMUNITY_PAGE)}>공유 페이지</PageButton>

            <PageButton onClick={() => navigate(CHART_PAGE)}>차트 페이지</PageButton>
            <PageButton onClick={logoutUserHandler}>로그아웃</PageButton>
          </Flex>
        </NavWrapper>
      ) : refreshToken ? (
        <NavWrapper>
          <Flex row gap={10}>
            <PageButton onClick={() => navigate(MY_PAGE)}>마이페이지</PageButton>
            <PageButton onClick={() => navigate(COMMUNITY_PAGE)}>공유 페이지</PageButton>
            <PageButton onClick={() => navigate(CHART_PAGE)}>차트 페이지</PageButton>
            <PageButton onClick={logoutUserHandler}>로그아웃</PageButton>
          </Flex>
        </NavWrapper>
      ) : (
        <NavWrapper>
          <Flex row gap={10}>
            <PageButton onClick={() => navigate(COMMUNITY_PAGE)}>공유 페이지</PageButton>
            <PageButton onClick={() => navigate("/")}>로그인</PageButton>
          </Flex>
        </NavWrapper>
      )}
    </StHeader>
  );
};

export default Header;

const EmoTrakLogo = styled.div`
  margin-left: 50px;
  cursor: pointer;
  ${device.mobile} {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StHeader = styled.header`
  width: 100%;
  padding: 10px;
  border: none;
  position: fixed;
  box-shadow: 5px 5px 5px ${themeColor.main.oatmeal};
  z-index: 50;
  top: 0px;
  left: 0px;
  background-color: ${themeColor.main.white};
  font-family: inherit;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  ${device.mobile} {
    align-items: center;
  }
  ${device.miniMobile} {
    padding: 5px;
  }
`;

const MobileHeader = styled.div`
  ${device.mobile} {
    width: 100%;
  }
`;
const PageButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 20px;
  font-family: "KyoboHand";
  letter-spacing: 0.5px;
  font-size: 18px;
  &:last-child {
    margin-right: 50px;
  }
`;
const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${device.mobile} {
    display: none;
  }
`;

const LogoImg = styled.img`
  width: 90px;
  ${device.miniMobile} {
    width: 80px;
  }
`;

const BackOfPage = styled.button`
  display: none;
  font-size: 30px;
  background-color: transparent;
  border: 0;
  position: absolute;
  ${device.mobile} {
    display: flex;
    align-items: center;
  }
`;
