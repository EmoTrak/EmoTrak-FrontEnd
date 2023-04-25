import React, { PropsWithChildren } from "react";
import * as UI from "../components/Modal";
import styled from "styled-components";
import { device, themeColor } from "../utils/theme";
import { BsCalendarHeart } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { MdContentPaste } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Calendar from "../assets/mobileMenubar/Calendar.png";
import board from "../assets/mobileMenubar/Paste.png";
import graph from "../assets/mobileMenubar/Combo Chart.png";
import Logout from "../assets/mobileMenubar/Logout.png";
import { useNavigate } from "react-router-dom";
import { CHART_PAGE, COMMUNITY_PAGE, HOME_PAGE } from "../data/routes/urls";
import { GoThreeBars } from "react-icons/go";

type logout = { logout: () => void };
const MobileMenubar = ({ children, logout }: PropsWithChildren & logout) => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "absolute", right: "25px" }}>
      <UI.Modalroot>
        <UI.ModalTrigger>
          <MenuButton>
            {" "}
            <GoThreeBars />
          </MenuButton>
          <UI.ModalBackground />
        </UI.ModalTrigger>
        <UI.ModalContent top={12} left={0}>
          <UI.ModalTrigger>
            <Content>
              <SelectButton onClick={() => navigate(HOME_PAGE)}>
                {/* <img src={Calendar} alt="달력" /> */}
                <BsCalendarHeart />
                <SelectText>달력</SelectText>
              </SelectButton>
              <SelectButton onClick={() => navigate(CHART_PAGE)}>
                {/* <img src={graph} alt="차트" /> */}
                <VscGraph />
                <SelectText>차트</SelectText>
              </SelectButton>
              <SelectButton onClick={() => navigate(COMMUNITY_PAGE)}>
                {/* <img src={board} alt="공유게시판" /> */}
                <MdContentPaste />
                <SelectText>공유</SelectText>
              </SelectButton>
              <SelectButton onClick={logout}>
                {/* <img src={Logout} alt="로그아웃" /> */}
                <RiLogoutBoxRLine />
                <SelectText>로그아웃</SelectText>
              </SelectButton>
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
  background-color: ${themeColor.main.oatmeal};
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  height: 110px;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3%;
  box-sizing: border-box;
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
  color: ${themeColor.main.coffemilk};
  font-size: 15px;
  margin-top: 5px;
`;
