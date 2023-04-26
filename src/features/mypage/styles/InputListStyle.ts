import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";
export const Aster = styled.span`
  color: ${themeColor.main.red};
`;

export const ListWrapper = styled.div`
  width: 30vw;
  display: flex;
  padding: 2rem 0px;
  border-bottom: 1px solid ${themeColor.main.gray};
  margin: 5px;
  position: relative;
  justify-content: center;
  align-items: center;
  ${device.tablet} {
    flex-direction: column;
    width: 80vw;
    border-bottom: none;
    margin: 2px;
  }
  ${device.mobile} {
    flex-direction: column;
    width: 80vw;
    border-bottom: none;
    margin: 2px;
  }
  ${device.miniMobile} {
    flex-direction: column;
    width: 80vw;
    border-bottom: none;
    margin: 2px;
  }
`;

export const ListTitle = styled.div`
  width: 7vw;
  font-size: 18px;
  display: flex;
  justify-content: center;
  font-weight: 800;
  ${device.tablet} {
    width: 100%;
    font-size: 18px;
    margin-right: 10px;
    justify-content: left;
    align-items: flex-start;
    color: ${themeColor.main.coffemilk};
  }
  ${device.mobile} {
    width: 100%;
    font-size: 18px;
    margin-right: 10px;
    justify-content: left;
    align-items: flex-start;
    color: ${themeColor.main.coffemilk};
  }
  ${device.miniMobile} {
    width: 100%;
    font-size: 18px;
    justify-content: left;
    margin-right: 10px;
    align-items: flex-start;
    color: ${themeColor.main.coffemilk};
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
