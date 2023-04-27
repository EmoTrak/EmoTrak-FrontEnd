import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-around;
  box-sizing: border-box;
  background-color: ${themeColor.main.white};
  ${device.mobile} {
    flex-direction: column;
  }
`;
export const ImageWrapper = styled.div`
  position: relative;
  width: 50vw;
  margin-top: 50px;
  margin-bottom: 50px;
  box-sizing: border-box;
  ${device.mobile} {
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    width: 100%;
  }
`;

export const PostDetailWrapper = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ${device.mobile} {
    width: 100%;
  }
`;

export const Img = styled.img`
  top: 150px;
  left: 20px;
  width: 90%;
  border-radius: 10%;
  position: sticky;
`;

export const Emoticon = styled.div`
  width: 23px;
`;

export const EmotionalScore = styled.div`
  font-size: 18px;
`;

export const EmotionStar = styled.div`
  /* min-width: 100px; */
  display: flex;
  gap: 15px;
`;

export const PostContent = styled.div`
  width: 40vw;
  margin-top: 30px;
  margin-bottom: 30px;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-color: ${themeColor.font};
  box-sizing: border-box;
  ${device.mobile} {
    width: 80%;
  }
`;

export const Nickname = styled.div`
  color: ${themeColor.main.chocomilk};
  font-size: 25px;
`;
