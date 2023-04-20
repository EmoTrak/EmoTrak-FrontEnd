import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCookie, removeCookie } from "../utils/cookies";
import Flex from "../components/Flex";
import {
  ADMIN,
  CHART_PAGE,
  COMMUNITY_PAGE,
  LOGIN_PAGE,
  MY_PAGE,
} from "../data/routes/urls";
import EmoTrak from "../assets/logo/EmoTrakLogo.png";
import { useState } from "react";

const Header = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const token = getCookie("token");

  const logoutUserHandler = () => {
    if (window.confirm("로그아웃하시겠습니까")) {
      navigate(`${LOGIN_PAGE}`);
      removeCookie("token", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
      removeCookie("expire", { path: "/" });
      setIsLogin(true);
    }
  };

  let payloadJson;
  let payload;
  const [headerB64, payloadB64, signatureB64] = (token || "").split(".");
  if (typeof atob !== undefined && payloadB64) {
    payloadJson = atob(payloadB64);
  }
  if (payloadJson !== undefined) {
    payload = JSON.parse(payloadJson);
  }

  return (
    <StHeader>
      <Flex row jc="space-between">
        <EmoTrakLogo onClick={() => navigate("/")}>
          <LogoImg src={EmoTrak} alt="로고" />
        </EmoTrakLogo>
        {payload?.auth === "ADMIN" ? (
          <NavWrapper>
            <Flex row gap={10}>
              <PageButton onClick={() => navigate(`${ADMIN}`)}>관리자페이지</PageButton>
              <PageButton onClick={() => navigate(`${MY_PAGE}`)}>마이페이지</PageButton>
              <PageButton onClick={() => navigate(`${COMMUNITY_PAGE}`)}>
                공유 페이지
              </PageButton>
              

              <PageButton onClick={() => navigate(`${CHART_PAGE}`)}>
                차트 페이지
              </PageButton>
              <PageButton onClick={logoutUserHandler}>로그아웃</PageButton>
            </Flex>
          </NavWrapper>
        ) : token ? (
          <NavWrapper>
            <Flex row gap={10}>
              <PageButton onClick={() => navigate(`${MY_PAGE}`)}>마이페이지</PageButton>
              <PageButton onClick={() => navigate(`${COMMUNITY_PAGE}`)}>
                공유 페이지
              </PageButton>
              <PageButton onClick={() => navigate(`${CHART_PAGE}`)}>
                차트 페이지
              </PageButton>
              <PageButton onClick={logoutUserHandler}>로그아웃</PageButton>
            </Flex>
          </NavWrapper>
        ) : (
          <NavWrapper>
            <Flex row gap={10}>
              <PageButton onClick={() => navigate(`${COMMUNITY_PAGE}`)}>
                공유 페이지
              </PageButton>
              <PageButton onClick={() => navigate(`${LOGIN_PAGE}`)}>로그인</PageButton>
            </Flex>
          </NavWrapper>
        )}
      </Flex>
    </StHeader>
  );
};

export default Header;

const EmoTrakLogo = styled.div`
  margin-left: 50px;
  cursor: pointer;
`;

const StHeader = styled.header`
  width: 100%;
  padding: 10px;
  border: none;
  position: fixed;
  box-shadow: 5px 5px 5px #e8e6e2;
  z-index: 10;
  top: 0px;
  left: 0px;
  background-color: white;
  font-family: inherit;
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
`;

const LogoImg = styled.img`
  width: 90px;
`;
