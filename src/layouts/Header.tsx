import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/EmoTrakLogo.svg";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../utils/cookies";
import Flex from "../components/Flex";
import {
  ADMIN,
  CHART_PAGE,
  COMMUNITY_PAGE,
  LOGIN_PAGE,
  MY_PAGE,
} from "../data/routes/urls";

const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const token = getCookie("token");

  const logoutUserHandler = () => {
    removeCookie("token", { path: "/" });
    removeCookie("nickname", { path: "/" });
    navigate(`${LOGIN_PAGE}`);
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
          <img src={Logo} alt="로고" />
        </EmoTrakLogo>
        {payload?.auth === 'ADMIN' ? (
          <NavWrapper>
            <Flex row gap={10}>
              <PageButton onClick={() => navigate(`${ADMIN}`)}>
                관리자페이지
              </PageButton>
              <PageButton onClick={() => navigate(`${MY_PAGE}`)}>
                마이페이지
              </PageButton>
              <PageButton onClick={() => navigate(`${COMMUNITY_PAGE}`)}>
                공유 페이지
              </PageButton>
              <PageButton onClick={() => navigate(`${CHART_PAGE}`)}>
                차트 페이지
              </PageButton>
              <PageButton onClick={logoutUserHandler}>로그아웃</PageButton>
            </Flex>
          </NavWrapper>
        ):token ? (
          <NavWrapper>
            <Flex row gap={10}>
              <PageButton onClick={() => navigate(`${MY_PAGE}`)}>
                마이페이지
              </PageButton>
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
              <PageButton onClick={() => navigate(`${LOGIN_PAGE}`)}>
                로그인
              </PageButton>
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

const StHeader = styled.div`
  width: 100%;
  height: 100px;
  padding: 5px;
  border: none;
  position: sticky;
  box-shadow: 5px 5px 5px #e8e6e2;
  z-index: 10;
  top: 0px;
  left: 0px;
  background-color: white;
`;

const PageButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 20px;
  &:last-child {
    margin-right: 50px;
  }
`;
const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
