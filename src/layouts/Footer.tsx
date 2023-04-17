import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../data/routes/urls";

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
          <span
            onClick={() => {
              window.open("");
            }}
          >
            오류 제보
          </span>
          &nbsp; | &nbsp;
          <span
            onClick={() => {
              window.open("");
            }}
          >
            만족도 조사
          </span>
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
  height: 120px;
  text-align: center;
  padding: 30px;
  font-size: 13px;
  color: gray;
  div {
    font-size: 25px;
    padding: 0px 0px 20px 0px;
    span {
      color: gray;
      text-decoration: none;

      :hover {
        cursor: pointer;
        color: #0c0a0a;
      }
    }
  }
`;
