import styled, { keyframes } from "styled-components";
import { device, themeColor } from "../../../utils/theme";
import { DayProps } from "../../../data/type/type";

export const OpenBox = keyframes`
  from {
    right: -100%;
  }
  to {
    right: 0%;
  }
`;

export const TabletOpenBox = keyframes`
  from {
    top: 100%;
  }
  to {
    top: 90%;
  }
`;

export const MobileOpenBox = keyframes`
  from {
    top: 100%;
  }
  to {
    top: 88%;
  }
`;

export const MiniMobileOpenBox = keyframes`
  from {
    top: 100%;
  }
  to {
    top: 85%;
  }
`;

export const Wrap = styled.div`
  display: flex;
  right: 0;
  animation: ${({ side }: Partial<DayProps>) => side && OpenBox} 1s ease;
  position: relative;
  ${device.tablet} {
    flex-direction: column;
    z-index: 10;
    left: 0;
    position: absolute;
    top: ${({ side }: Partial<DayProps>) => side && "90%"};
    animation: ${({ side }: Partial<DayProps>) => side && TabletOpenBox} 1s ease;
  }
  ${device.mobile} {
    top: ${({ side }: Partial<DayProps>) => side && "88%"};
    animation: ${({ side }: Partial<DayProps>) => side && MobileOpenBox} 1s ease;
  }
  ${device.miniMobile} {
    top: ${({ side }: Partial<DayProps>) => side && "85%"};
    animation: ${({ side }: Partial<DayProps>) => side && MiniMobileOpenBox} 1s ease;
  }
`;
export const Container = styled.div`
  width: 27vw;
  height: 100vh;
  background-color: ${themeColor.main.oatmeal};
  box-sizing: border-box;
  padding: 60px 10px;
  display: flex;
  flex-direction: column;
  ${device.tablet} {
    padding: 30px 10px;
    width: 100vw;
    height: 400px;
    gap: 10px;
  }
  ${device.mobile} {
    padding: 20px 5px;
    height: 450px;
    flex-direction: column;
  }
  ${device.miniMobile} {
    height: 300px;
    flex-direction: column;
  }
`;

export const CloseBtn = styled.button`
  margin-top: 20px;
  height: 60px;
  width: 35px;
  color: ${themeColor.main.white};
  background-color: ${themeColor.main.oatmeal};
  border-radius: 5px 0 0 5px;
  font-size: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  ${device.tablet} {
    width: 30px;
    height: 60px;
    margin-left: 20px;
    position: relative;
    top: 20px;
    transform: rotate(90deg);
  }
`;

export const ContentBox = styled.div`
  height: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  ${device.mobile} {
    width: 100%;
  }
`;

export const Imoticon = styled.div`
  border-radius: 50%;
  position: relative;
  background-color: ${themeColor.main.white};
  padding: 5px;
  width: 38px;
  height: 38px;
  margin-right: 10px;
  ${device.miniMobile} {
    padding: 3px;
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
`;

export const Content = styled.div`
  background-color: ${themeColor.main.white};
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  width: 22vw;
  height: 80%;
  overflow: hidden;
  word-break: break-all;
  cursor: pointer;
  color: ${themeColor.main.coffemilk};
  ${device.tablet} {
    width: 90vw;
    height: 100%;
    padding: 10px;
  }
`;

export const PostContent = styled.div`
  background-color: ${themeColor.main.white};
  border-radius: 5px;
  width: 22vw;
  height: 80%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  cursor: pointer;
  color: ${themeColor.main.coffemilk};
  ${device.tablet} {
    width: 90vw;
    height: 100%;
  }
`;
