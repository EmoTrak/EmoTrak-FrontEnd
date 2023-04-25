import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { RxNotionLogo } from "react-icons/rx";
import { PRIVACY_POLICY } from "../data/routes/urls";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import { device, themeColor } from "../utils/theme";

const Footer = () => {
  const nav = useNavigate();
  const date = new Date();

  return (
    <Wrap>
      <FooterSt>
        <div>
          <span
            onClick={() => {
              nav("/");
            }}
          >
            튜토리얼&nbsp; | &nbsp;
          </span>
          <a href="" target="_blank" rel="noreferrer">
            오류 제보
          </a>
          &nbsp; | &nbsp;
          <a href="" target="_blank" rel="noreferrer">
            만족도 조사
          </a>
          <div>
            <a href="https://github.com/EmoTrak" target="_blank" rel="noreferrer">
              <AiFillGithub />
            </a>
            <a
              href="https://www.notion.so/1nxeo/4-EmoTrak-0e155b9e771b4c659480f406933151f6"
              target="_blank"
              rel="noreferrer"
            >
              <RxNotionLogo />
            </a>
          </div>
        </div>
        <br />
        <span
          onClick={() => {
            nav(PRIVACY_POLICY);
          }}
        >
          개인정보 처리방침 Privacy Policy
        </span>
        <br /> <br />
        윤지현(FE) 양인서(FE) 박승우(FE) 이 진(BE) 홍다정(BE) 서영석(BE) 박문주(BE)
        이수정(DE)
        <br />©{date.getFullYear()} TEAM EMOTRAK. ALL RIGHTS RESERVED
      </FooterSt>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  background-color: ${themeColor.main.white};
  position: relative;
`;
const FooterSt = styled.ul`
  background-color: ${themeColor.main.white};
  text-align: center;
  padding: 30px;
  font-size: 13px;
  color: ${themeColor.main.gray};
  div {
    font-size: 25px;
    span {
      color: ${themeColor.main.gray};
      cursor: pointer;
      :hover {
        color: ${themeColor.main.black};
      }
      ${device.miniMobile} {
        font-size: 15px;
      }
    }
    a {
      color: gray;
      text-decoration: none;
      :hover {
        color: ${themeColor.main.black};
      }
      ${device.miniMobile} {
        font-size: 15px;
      }
    }
    div {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      justify-content: center;
      a {
        text-decoration: none;
        color: ${themeColor.main.black};
        font-size: 35px;
        ${device.miniMobile} {
          font-size: 25px;
        }
      }
    }
  }
`;
