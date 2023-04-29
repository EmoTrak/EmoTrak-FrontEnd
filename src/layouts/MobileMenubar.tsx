import { useNavigate } from "react-router-dom";
import { BsCalendarHeart } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { MdContentPaste } from "react-icons/md";
import { BsPersonFillGear } from "react-icons/bs";
import { RiLoginBoxLine } from "react-icons/ri";
import { GoThreeBars } from "react-icons/go";
import {
  CHART_PAGE,
  COMMUNITY_PAGE,
  HOME_PAGE,
  MY_PAGE,
} from "../data/routes/urls";
import { Logout } from "../data/type/type";
import { getCookie } from "../utils/cookies";
import * as UI from "../components/Modal";
import * as St from "../layouts/LayoutStyle";

const MobileMenubar = ({ logout }: Logout) => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");

  return (
    <St.MobileMenubarWrapper>
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
              {refreshToken ? (
                <>
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
                  <St.SelectButton onClick={() => navigate(MY_PAGE)}>
                    <BsPersonFillGear />
                    <St.SelectText>설정</St.SelectText>
                  </St.SelectButton>
                </>
              ) : (
                <>
                  <St.SelectButton onClick={() => navigate("/")}>
                    <BsCalendarHeart />
                    <St.SelectText>달력</St.SelectText>
                  </St.SelectButton>
                  <St.SelectButton onClick={() => navigate("/")}>
                    <VscGraph />
                    <St.SelectText>차트</St.SelectText>
                  </St.SelectButton>
                  <St.SelectButton onClick={() => navigate(COMMUNITY_PAGE)}>
                    <MdContentPaste />
                    <St.SelectText>공유</St.SelectText>
                  </St.SelectButton>
                  <St.SelectButton onClick={() => navigate("/")}>
                    <RiLoginBoxLine />
                    <St.SelectText>로그인</St.SelectText>
                  </St.SelectButton>
                </>
              )}
            </St.Content>
          </UI.ModalTrigger>
        </UI.ModalContent>
      </UI.Modalroot>
    </St.MobileMenubarWrapper>
  );
};

export default MobileMenubar;
