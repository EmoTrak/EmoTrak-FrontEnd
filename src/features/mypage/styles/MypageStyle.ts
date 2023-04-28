import styled from "styled-components";
import { HelperText } from "../../../data/type/type";
import { device, themeColor } from "../../../utils/theme";

export const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const MyPageContentWrapper = styled.div`
  width: 80vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MyPageInput = styled.input`
  width: 15vw;
  height: 1vw;
  border: none;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  font-size: 20px;
  color: ${themeColor.font};
  font-family: inherit;
  ${device.tablet} {
    width: 60vw;
    height: 3vh;
    // margin: 10px;
    border-bottom: 1px solid ${themeColor.main.coffemilk};
  }
  ${device.mobile} {
    width: 80vw;
  }
`;

export const MyPageHelperText = styled.span<HelperText>`
  margin: 0;
  color: ${({ important }) =>
    important ? `${themeColor.main.red}` : `${themeColor.main.black}`};
`;

export const MyPageButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
`;

export const MyPageLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15vw;
`;
