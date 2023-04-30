import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const Aster = styled.span`
  color: ${themeColor.main.red};
`;

export const ListWrapper = styled.div`
  width: 42vw;
  display: flex;
  padding: 1rem 0px;
  border-bottom: 1px solid ${themeColor.main.gray};
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 5px;
  gap: 2vh;
  ${device.tablet} {
    flex-direction: column;
    width: 80vw;
    border-bottom: none;
  }
`;

export const ListTitle = styled.label`
  font-size: 18px;
  width: 10vw;
  display: flex;
  justify-content: center;
  font-weight: 800;
  color: ${themeColor.main.chocomilk};
  ${device.tablet} {
    width: 100%;
    font-size: 18px;
    margin-right: 10px;
    justify-content: left;
    align-items: flex-start;
  }
`;

export const ListContent = styled.div`
  flex: 1 1 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5vw;
`;
