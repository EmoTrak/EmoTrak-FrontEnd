import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../data/routes/urls";
import { AiFillGithub } from "react-icons/ai";
import { RxNotionLogo } from "react-icons/rx";

const Footer = (): JSX.Element => {
  const nav = useNavigate();
  const date = new Date();

  return (
    <Wrap>
      <FooterSt>
        <div>
          <span
            onClick={() => {
              nav(`${LOGIN_PAGE}`);
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
        윤지현(FE) 양인서(FE) 박승우(FE) 이 진(BE) 홍다정(BE) 서영석(BE) 박문주(BE)
        이수정(DE)
        <br />
        <br />©{date.getFullYear()} TEAM EMOTRAK. ALL RIGHTS RESERVED
      </FooterSt>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  background-color: #fffffc;
  position: relative;
`;
const FooterSt = styled.ul`
  background-color: #fffffc;
  text-align: center;
  padding: 30px;
  font-size: 13px;
  color: gray;
  div {
    font-size: 25px;
    span {
      color: gray;
      cursor: pointer;
      :hover {
        color: #0c0a0a;
      }
    }
    a {
      color: gray;
      text-decoration: none;
      :hover {
        color: #0c0a0a;
      }
    }
    div {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      justify-content: center;
      a {
        text-decoration: none;
        color: black;
        font-size: 35px;
      }
    }
  }
`;
