import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookies";
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
import { logout } from "../utils/logout";

const Header = () => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");
  const token = getCookie("token");
  const logoutUserHandler = () => {
    if (window.confirm("로그아웃하시겠습니까")) {
      logout();
      navigate(LOGIN_PAGE);
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

  return (
    <St.Header>
      {refreshToken ? (
        <St.EmoTrakLogo onClick={() => navigate(HOME_PAGE)}>
          <St.LogoImg src={EmoTrak} alt="logo" />
        </St.EmoTrakLogo>
      ) : (
        <St.EmoTrakLogo onClick={() => navigate("/")}>
          <St.LogoImg src={EmoTrak} alt="logo" />
        </St.EmoTrakLogo>
      )}
      <MobileMenubar />
      {payload?.auth === "ADMIN" ? (
        <St.NavWrapper>
          <Flex row gap={10}>
            <St.PageButton onClick={() => navigate(ADMIN)}>관리자페이지</St.PageButton>
            <St.PageButton onClick={() => navigate(COMMUNITY_PAGE)}>
              공유 페이지
            </St.PageButton>

            <St.PageButton onClick={() => navigate(CHART_PAGE)}>
              차트 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(MY_PAGE)}>마이페이지</St.PageButton>
            <St.PageButton onClick={logoutUserHandler}>로그아웃</St.PageButton>
          </Flex>
        </St.NavWrapper>
      ) : refreshToken ? (
        <St.NavWrapper>
          <Flex row gap={10}>
            <St.PageButton onClick={() => navigate(COMMUNITY_PAGE)}>
              공유 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(HOME_PAGE)}>달력 페이지</St.PageButton>
            <St.PageButton onClick={() => navigate(CHART_PAGE)}>
              차트 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(MY_PAGE)}>마이페이지</St.PageButton>
            <St.PageButton onClick={logoutUserHandler}>로그아웃</St.PageButton>
          </Flex>
        </St.NavWrapper>
      ) : (
        <St.NavWrapper>
          <Flex row gap={10}>
            <St.PageButton onClick={() => navigate(COMMUNITY_PAGE)}>
              공유 페이지
            </St.PageButton>
            <St.PageButton onClick={() => navigate(LOGIN_PAGE)}>로그인</St.PageButton>
          </Flex>
        </St.NavWrapper>
      )}
    </St.Header>
  );
};

export default Header;
