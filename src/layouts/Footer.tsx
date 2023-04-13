import React from "react";
import styled from "styled-components";
import Logo from "../assets/emoticon/footer.svg";
import { useNavigate } from "react-router-dom";

const Footer = (): JSX.Element => {
  const nav = useNavigate();
  return (
    <SSFooter>
      <AboutPage onClick={() => nav("/members")}>
        <p>About Us</p>
        <img src={Logo} alt="footerLogo" />
      </AboutPage>
    </SSFooter>
  );
};

export default Footer;

const SSFooter = styled.div`
  width: 100%;
  height: 90px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px 10px #e8e6e2;
  background-color: white;
`;

const AboutPage = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
