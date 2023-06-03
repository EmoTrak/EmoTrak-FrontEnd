import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { RxNotionLogo } from "react-icons/rx";
import { PRIVACY_POLICY } from "../data/routes/urls";
import * as St from "../layouts/LayoutStyle";
import Flex from "../components/Flex";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <St.Wrap>
      <St.Footer>
        <Flex row jc="center" ai="center">
          <div>
            <a
              href="https://github.com/EmoTrak"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub />
            </a>
          </div>
          <div>
            <a
              href="https://www.notion.so/1nxeo/4-EmoTrak-0e155b9e771b4c659480f406933151f6"
              target="_blank"
              rel="noreferrer"
            >
              <RxNotionLogo />
            </a>
          </div>
        </Flex>

        <div
          style={{ marginBottom: "15px", marginTop: "5px" }}
          onClick={() => {
            navigate(PRIVACY_POLICY);
          }}
        >
          개인정보 처리방침 Privacy Policy
        </div>

        <Flex gap={5}>
          <div>윤지현(FE) 양인서(FE) 박승우(FE)</div>
          <div> 이 진(BE) 홍다정(BE) 서영석(BE) 박문주(BE)</div>
          이수정(DE)
          <div>©2023 TEAM EMOTRAK. ALL RIGHTS RESERVED</div>
        </Flex>
      </St.Footer>
    </St.Wrap>
  );
};

export default Footer;
