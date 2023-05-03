import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 50px;
  ${device.tablet} {
    padding: 0px;
  }
`;

export const SelectBar = styled.div`
  height: 70px;
  background-color: ${themeColor.main.oatmeal};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${device.miniMobile} {
    justify-content: space-around;
    min-width: 320px;
    height: 50px;
  }
`;

export const ButtonBox = styled.div`
  margin-left: 30px;
  ${device.miniMobile} {
    margin-left: 0px;
  }
`;
export const StEmoButton = styled.button<{ isClick: boolean }>`
  width: 45px;
  height: 45px;
  border: 0;
  background-color: ${(props) =>
    props.isClick ? themeColor.main.chocomilk : "transparent"};
  margin-left: 15px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.isClick ? themeColor.main.chocomilk : themeColor.main.gray};
  }
  ${device.mobile} {
    width: 45px;
    height: 45px;
    margin-left: 10px;
  }
  ${device.miniMobile} {
    width: 36px;
    height: 36px;
    margin-left: 5px;
  }
`;

export const SelectTitle = styled.div`
  width: 60px;
  margin-left: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  ${device.miniMobile} {
    margin-left: 10px;
    width: 50px;
    font-size: 15px;
  }
`;

export const Sort = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${themeColor.main.white};
  border: 1px solid;
  border-radius: 10px;
  z-index: 5;
  position: absolute;
  top: 35px;
  width: 60px;
  left: -10px;
  overflow: hidden;
`;

export const SortListBtn = styled.button`
  border: 0;
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
  font-family: "KyoboHand";
  &:hover {
    background-color: ${themeColor.main.gray};
  }
`;
export const ImageContainer = styled.div`
  margin-top: 10px;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;

  ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
  ${device.mobile} {
    grid-template-columns: repeat(3, 1fr);
    min-width: 320px;
  }
`;

export const Image = styled.img`
  width: 100%;
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${themeColor.main.white};
  align-items: center;
  height: 280px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10%;
  position: relative;
  :hover {
    box-shadow: 2px 2px 5px 1px ${themeColor.main.chocomilk};
  }
  :active {
    box-shadow: 2px 2px 5px -1px ${themeColor.main.chocomilk};
  }
  ${device.tablet} {
    height: 220px;
  }
  ${device.miniMobile} {
    height: 140px;
  }
`;

export const ScrollOntop = styled.button`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  background-color: ${themeColor.main.coffemilk};
  color: ${themeColor.main.white};
  border-radius: 50%;
  border: 0px;
  width: 40px;
  height: 40px;
  font-size: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const HoverEmoticon = styled.div<{ openEmo: boolean }>`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 10px;
  left: 15px;
  display: ${({ openEmo }) => (openEmo ? "content" : "none")};
`;

export const HoverNickName = styled.div<{ openEmo: boolean }>`
  position: absolute;
  width: 55px;
  height: 20px;
  bottom: 12px;
  right: 5px;
  word-break: keep-all;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: ${({ openEmo }) => (openEmo ? "content" : "none")};
`;
