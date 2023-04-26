import styled from "styled-components";
import { device, themeColor } from "../utils/theme";

export const MenuButton = styled.div`
  display: none;
  font-size: 25px;
  color: ${themeColor.main.chocomilk};
  ${device.mobile} {
    display: contents;
  }
`;

export const Content = styled.div`
  display: none;
  ${device.mobile} {
    position: fixed;
    top: 90px;
    left: 0;
    background-color: ${themeColor.main.oatmeal};
    box-shadow: 3px 3px 5px ${themeColor.main.oatmeal};
    border-radius: 0 0 5% 5%;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 100px;
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 3%;
    box-sizing: border-box;
  }
`;

export const SelectButton = styled.div`
  background-color: ${themeColor.main.white};
  width: 75px;
  height: 75px;
  border-radius: 25%;
  color: ${themeColor.main.chocomilk};
  box-shadow: 1px 1px 5px ${themeColor.main.chocomilk};
  padding: 2%;
  box-sizing: border-box;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectText = styled.div`
  ${device.mobile} {
    color: ${themeColor.main.coffemilk};
    font-size: 15px;
    margin-top: 5px;
  }
`;

export const Container = styled.div`
  margin-top: 110px;
  margin-bottom: 10px;
  min-height: 90vh;
  position: relative;
  ${device.mobile} {
    min-height: 70vh;
  }
  ${device.miniMobile} {
    margin-top: 110px;
  }
`;
export const EmoTrakLogo = styled.div`
  margin-left: 50px;
  cursor: pointer;
  ${device.mobile} {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Header = styled.header`
  width: 100vw;
  padding: 10px;
  border: none;
  position: fixed;
  box-shadow: 5px 5px 5px ${themeColor.main.oatmeal};
  z-index: 50;
  top: 0px;
  left: 0px;
  background-color: ${themeColor.main.white};
  font-family: inherit;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  ${device.mobile} {
    align-items: center;
  }
`;

export const PageButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 20px;
  font-family: "KyoboHand";
  letter-spacing: 0.5px;
  font-size: 18px;
  &:last-child {
    margin-right: 50px;
  }
`;
export const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${device.mobile} {
    display: none;
  }
`;

export const LogoImg = styled.img`
  width: 90px;
  ${device.miniMobile} {
    width: 80px;
  }
`;

export const BackOfPage = styled.button`
  display: none;
  font-size: 30px;
  background-color: transparent;
  border: 0;
  position: absolute;
  color: ${themeColor.main.chocomilk};
  ${device.mobile} {
    display: flex;
    align-items: center;
  }
`;

export const Wrap = styled.div`
  background-color: ${themeColor.main.white};
  position: relative;
  width: 100vw;
`;
export const Footer = styled.ul`
  background-color: ${themeColor.main.white};
  text-align: center;
  padding: 20px;
  margin: 0;
  font-size: 13px;
  color: ${themeColor.main.gray};
  div {
    font-size: 25px;
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
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: center;
      a {
        display: flex;
        margin: 5px 0 10px 0;
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
