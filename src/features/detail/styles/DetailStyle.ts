import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const Container = styled.div`
  display: flex;
  background-color: ${themeColor.main.white};
  padding-top: 1%;
  height: 100%;
  position: relative;
  ${device.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
  }
`;
export const CanvasWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  position: relative;
  ${device.mobile} {
  }
`;
export const Wrapper = styled.div`
  width: 48vw;
  margin-top: 75px;
  ${device.mobile} {
    margin-top: 10px;
    width: 80vw;
  }
`;

export const DetailText = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-color: ${themeColor.main.chocomilk};
  min-height: 50vh;
  ${device.mobile} {
    min-height: 10vh;
    height: 100%;
  }
`;

export const SharedWrap = styled.div`
  margin-left: 50px;
  ${device.mobile} {
    margin: 0;
    display: flex;
    justify-content: center;
  }
`;

export const BackWrap = styled.div`
  position: absolute;
  left: 2%;
  z-index: 10;
  ${device.mobile} {
    display: none;
  }
`;

export const DetailWrapper = styled.pre`
  background-size: cover;
  display: flex;
  background-color: ${themeColor.main.white};
  padding: 10px;
  width: 90%;
  font-size: 25px;
  line-height: 20px;
`;

export const DefaultImage = styled.div`
  border: 1px solid;
`;

export const DetailImage = styled.img`
  width: 80%;
  top: 100px;
  position: sticky;
  ${device.mobile} {
    width: 90vw;
    border-radius: 10px;
    border: 5px solid ${themeColor.main.oatmeal};
  }
`;

export const DetailImageBox = styled.div`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 50px;
  ${device.mobile} {
    width: 100vw;
    height: 100%;
  }
`;
export const DetailEmoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  ${device.miniMobile} {
    display: flex;
    flex-direction: column;
    h3 {
      margin: 0;
      display: flex;
      justify-content: center;
    }
  }
`;
export const DetailBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
`;
export const EmoMoveBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const EmoScore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 0;
    display: flex;
    justify-content: center;
    font-size: 30px;
  }
  ${device.miniMobile} {
    flex-direction: column;
  }
`;

export const EmoStar = styled.div`
  display: flex;
  gap: 15px;
  min-width: 160px;
`;
export const EmoIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;
