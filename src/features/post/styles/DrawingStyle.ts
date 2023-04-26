import styled from "styled-components";
import { EmoButtonProps, UrlType } from "../../../data/type/type";
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

export const Canvas = styled.canvas`
  position: unset;
  background-color: ${themeColor.main.white};
  width: 85%;
  height: 90%;
  ${device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const ToolBox = styled.div`
  display: flex;
  width: 40vw;
  height: 7vh;
  justify-content: flex-end;
  align-items: center;
  ${device.mobile} {
    width: 80vw;
  }
`;

export const ToolList = styled.li`
  list-style: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PenSizeTool = styled.div`
  position: absolute;
  top: -16vh;
  right: -0.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.tablet} {
    top: -16vh;
    right: -1.5vw;
  }
  ${device.mobile} {
    top: -18vh;
    right: -1.5vw;
  }
`;

export const PenButton = styled.button<UrlType>`
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 1.5vw;
  height: 1.5vw;
  border: none;
  ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const EraserButton = styled.button<UrlType>`
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 1.5vw;
  height: 1.5vw;
  border: none;
  margin: 5px;
  ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const RebootButton = styled.button<UrlType>`
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 1.2vw;
  height: 1.2vw;
  border: none;
  margin: 5px;
  ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;
