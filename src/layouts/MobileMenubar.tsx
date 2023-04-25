import React, { PropsWithChildren } from "react";
import * as UI from "../components/Modal";
import styled from "styled-components";
import { device, themeColor } from "../utils/theme";
import { BsCalendarHeart } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { MdContentPaste } from "react-icons/md";
import { RiLogoutBoxRLine, RiLoginBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CHART_PAGE, COMMUNITY_PAGE, HOME_PAGE } from "../data/routes/urls";
import { GoThreeBars } from "react-icons/go";
import { getCookie } from "../utils/cookies";

type logout = { logout: () => void };
const MobileMenubar = ({ logout }: logout) => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  return (
    <div style={{ position: "absolute", right: "25px" }}>
      <UI.Modalroot>
        <UI.ModalTrigger>
          <MenuButton>
            <GoThreeBars />
          </MenuButton>
          <UI.ModalBackground />
        </UI.ModalTrigger>
        <UI.ModalContent>
          <UI.ModalTrigger>
            <Content>
              <SelectButton onClick={() => navigate(HOME_PAGE)}>
                <BsCalendarHeart />
                <SelectText>달력</SelectText>
              </SelectButton>
              <SelectButton onClick={() => navigate(CHART_PAGE)}>
                <VscGraph />
                <SelectText>차트</SelectText>
              </SelectButton>
              <SelectButton onClick={() => navigate(COMMUNITY_PAGE)}>
                <MdContentPaste />
                <SelectText>공유</SelectText>
              </SelectButton>
              {refreshToken ? (
                <SelectButton onClick={logout}>
                  <RiLogoutBoxRLine />
                  <SelectText>로그아웃</SelectText>
                </SelectButton>
              ) : (
                <SelectButton onClick={() => navigate("/")}>
                  <RiLoginBoxLine />
                  <SelectText>로그인</SelectText>
                </SelectButton>
              )}
            </Content>
          </UI.ModalTrigger>
        </UI.ModalContent>
      </UI.Modalroot>
    </div>
  );
};

export default MobileMenubar;

const MenuButton = styled.div`
  display: none;
  font-size: 25px;
  ${device.mobile} {
    display: contents;
  }
`;

const Content = styled.div`
  display: none;
  ${device.mobile} {
    position: fixed;
    top: 90px;
    left: 0;
    background-color: ${themeColor.main.oatmeal};
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 110px;
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 3%;
    box-sizing: border-box;
  }
`;

const SelectButton = styled.div`
  background-color: ${themeColor.main.white};
  width: 75px;
  height: 75px;
  border-radius: 25%;
  color: ${themeColor.main.chocomilk};
  padding: 2%;
  box-sizing: border-box;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectText = styled.div`
  ${device.mobile} {
    color: ${themeColor.main.coffemilk};
    font-size: 15px;
    margin-top: 5px;
  }
`;
