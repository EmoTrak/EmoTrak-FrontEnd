import styled, { css } from "styled-components";
import { EmoButtonProps } from "../../../data/type/type";
import { device, themeColor } from "../../../utils/theme";

export const DrawPostWrap = styled.div`
  height: 100vh;
  ${device.mobile} {
    overflow: auto;
  }
`;
export const DrawingPostWrap = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    width: 100%;
    height: 50%;
    overflow: auto;
    p {
      display: none;
    }
  }
`;
export const List = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const DrawWrap = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    width: 100vw;
    height: 50vh;
    margin: 0;
  }
`;

export const UnorderLi = styled.ul`
  min-width: 300px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  ${device.tablet} {
    margin-bottom: 0;
    margin-top: 10px;
  }
  ${device.mobile} {
    margin-bottom: 10px;
  }
`;

export const EmoButtonBox = styled.div`
  width: 270px;
  display: flex;
  justify-content: center;
  margin: 3px;
  ${device.tablet} {
    gap: 5px;
  }
`;

export const EmoButton = styled.button<EmoButtonProps>`
  width: 46px;
  height: 46px;
  background-color: ${(props) =>
    props.selected ? themeColor.main.coffemilk : "transparent"};
  border: 0;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.selected ? themeColor.main.coffemilk : themeColor.main.gray};
  }
  ${device.tablet} {
    width: 42px;
    height: 42px;
  }
`;

export const Canvas = styled.canvas<{ isCanvas: boolean }>`
  position: unset;
  background-color: ${themeColor.main.white};
  touch-action: none;
  margin-top: 100px;
  ${({ isCanvas }) =>
    !isCanvas &&
    css`
      pointer-events: none;
    `};
  ${device.mobile} {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
  }
`;

export const ToolBox = styled.ul`
  display: flex;
  width: 50vw;
  height: 8vh;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-bottom: 50px;
  ${device.mobile} {
    gap: 3vw;
    width: 80vw;
  }
  ${device.miniMobile} {
    margin-bottom: 100px;
  }
`;

export const ToolList = styled.li`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const PenSizeTool = styled.div`
  position: absolute;
  top: -120px;
  right: 6.1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.tablet} {
    right: 12vw;
  }
  ${device.mobile} {
    right: 17vw;
  }
`;

export const PenButton = styled.button<{ color: string; mode: string }>`
  font-size: 27px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ color, mode }) =>
    mode === "eraser" ? `${themeColor.main.gray}` : color};
  ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const EraserButton = styled.button<{ mode: string }>`
  font-size: 30px;
  border: none;
  margin: 5px;
  background-color: transparent;
  cursor: pointer;
  color: ${({ mode }) =>
    mode === "eraser" ? themeColor.main.black : themeColor.main.gray};
  ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const RebootButton = styled.button`
  background-color: transparent;
  font-size: 30px;
  margin: 5px;
  border: none;
  cursor: pointer;
  color: ${themeColor.main.gray};
  &:hover {
    color: ${themeColor.main.black};
  }
  ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;
