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

export const EmoButton = styled.button<EmoButtonProps>`
  width: 55px;
  height: 55px;
  border: ${(props) =>
    props.selected
      ? `5px solid ${themeColor.main.gray}`
      : "5px solid transparent"};
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:focus {
    border: 5px solid ${themeColor.main.gray};
  }
  &:hover {
    border: 5px solid ${themeColor.main.gray};
  }
`;

export const Canvas = styled.canvas<{ isCanvas: boolean }>`
  position: unset;
  background-color: ${themeColor.main.white};
  touch-action: none;
  ${({ isCanvas }) =>
    !isCanvas &&
    css`
      pointer-events: none;
    `};
  ${device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const ToolBox = styled.ul`
  display: flex;
  width: 50vw;
  height: 7vh;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  ${device.mobile} {
    gap: 3vw;
    width: 80vw;
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
  top: -17vh;
  right: 6.1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.tablet} {
    top: -20vh;
    right: 10.5vw;
  }
  ${device.mobile} {
    top: -18vh;
    right: 15vw;
  }
`;

export const PenButton = styled.button<{ color: string }>`
  font-size: 27px;
  border: none;
  background-color: transparent;
  color: ${({ color }) => color};
  ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const EraserButton = styled.button<{ color: string }>`
  font-size: 30px;
  border: none;
  margin: 5px;
  background-color: transparent;
  color: ${({ color }) =>
    color === "eraser" ? themeColor.main.black : themeColor.main.gray};
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
  ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;