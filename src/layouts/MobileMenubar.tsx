import * as UI from "../components/Modal";
import * as St from "../layouts/LayoutStyle";

import { BsCalendarHeart } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { MdContentPaste } from "react-icons/md";
import { RiLogoutBoxRLine, RiLoginBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CHART_PAGE, COMMUNITY_PAGE, HOME_PAGE } from "../data/routes/urls";
import { GoThreeBars } from "react-icons/go";
import { getCookie } from "../utils/cookies";
import { Logout } from "../data/type/type";

const MobileMenubar = ({ logout }: Logout) => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  return (
    <div style={{ position: "absolute", right: "25px" }}>
      <UI.Modalroot>
        <UI.ModalTrigger>
          <St.MenuButton>
            <GoThreeBars />
          </St.MenuButton>
          <UI.ModalBackground />
        </UI.ModalTrigger>
        <UI.ModalContent>
          <UI.ModalTrigger>
            <St.Content>
              <St.SelectButton onClick={() => navigate(HOME_PAGE)}>
                <BsCalendarHeart />
                <St.SelectText>달력</St.SelectText>
              </St.SelectButton>
              <St.SelectButton onClick={() => navigate(CHART_PAGE)}>
                <VscGraph />
                <St.SelectText>차트</St.SelectText>
              </St.SelectButton>
              <St.SelectButton onClick={() => navigate(COMMUNITY_PAGE)}>
                <MdContentPaste />
                <St.SelectText>공유</St.SelectText>
              </St.SelectButton>
              {refreshToken ? (
                <St.SelectButton onClick={logout}>
                  <RiLogoutBoxRLine />
                  <St.SelectText>로그아웃</St.SelectText>
                </St.SelectButton>
              ) : (
                <St.SelectButton onClick={() => navigate("/")}>
                  <RiLoginBoxLine />
                  <St.SelectText>로그인</St.SelectText>
                </St.SelectButton>
              )}
            </St.Content>
          </UI.ModalTrigger>
        </UI.ModalContent>
      </UI.Modalroot>
    </div>
  );
};

export default MobileMenubar;
