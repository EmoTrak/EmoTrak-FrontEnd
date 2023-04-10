import React from "react";
import styled from "styled-components";
import Logo from "../assets/이모트랙 로고.svg";
import { useNavigate } from "react-router-dom";
import { cookies } from "../utils/cookies";
import Flex from "../components/Flex";

const Header = (): JSX.Element => {
  const nav = useNavigate();
  const token = cookies.get("token");
  console.log(token);

  return (
    <StHeader>
      <Flex row jc="space-between">
        <EmoTrakLogo>
          <img src={Logo} alt="로고" />
        </EmoTrakLogo>
        {token ? (
          <NavWrapper>
            <Flex row gap={10}>
              <PageButton onClick={() => nav("/community")}>
                공유 페이지
              </PageButton>
              <PageButton onClick={() => nav("/chart")}>차트 페이지</PageButton>
              <PageButton onClick={() => nav("/login")}>로그아웃</PageButton>
            </Flex>
          </NavWrapper>
        ) : (
          <NavWrapper>
            <Flex row gap={10}>
              <PageButton onClick={() => nav("/community")}>
                공유 페이지
              </PageButton>
              <PageButton onClick={() => nav("/chart")}>차트 페이지</PageButton>
              <PageButton onClick={() => nav("/login")}>로그인</PageButton>
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
const NavWrapper =styled.div`
  display: flex;
  justify-content: center;
  
`