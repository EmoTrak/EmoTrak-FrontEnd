import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { RxNotionLogo } from "react-icons/rx";
import { PRIVACY_POLICY } from "../data/routes/urls";
import * as St from "../layouts/LayoutStyle";

const Footer = () => {
  const nav = useNavigate();
  const date = new Date();

  return (
    <St.Wrap>
      <St.Footer>
        <div>
          <a href="" target="_blank" rel="noreferrer">
            오류 제보
          </a>
          &nbsp; | &nbsp;
          <a href="" target="_blank" rel="noreferrer">
            만족도 조사
          </a>
          <div>
            <a
              href="https://github.com/EmoTrak"
              target="_blank"
              rel="noreferrer"
            >
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
        <span
          onClick={() => {
            nav(PRIVACY_POLICY);
          }}
        >
          개인정보 처리방침 Privacy Policy
        </span>
        <br />
        <br />
        윤지현(FE) 양인서(FE) 박승우(FE) 이 진(BE) 홍다정(BE) 서영석(BE)
        박문주(BE) 이수정(DE)
        <br />©{date.getFullYear()} TEAM EMOTRAK. ALL RIGHTS RESERVED
      </St.Footer>
    </St.Wrap>
  );
};

export default Footer;
