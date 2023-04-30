import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-around;
  box-sizing: border-box;
  background-color: ${themeColor.main.white};
  min-height: 90vh;
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
  position: relative;
  margin-top: 50px;
  ${device.mobile} {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    margin-top: 0px;
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
  width: 25px;
`;

export const EmotionalScore = styled.div`
  font-size: 20px;
  white-space: nowrap;
  padding-bottom: 2px;
  border-bottom: 2px solid;
`;

export const PostContent = styled.pre`
  width: 40vw;
  min-height: 30vh;
  margin-top: 30px;
  margin-bottom: 30px;
  line-height: 25px;
  font-size: 18px;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-color: ${themeColor.font};
  box-sizing: border-box;
  white-space: pre-wrap;
  ${device.mobile} {
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    min-height: 10vh;
  }
`;

export const Nickname = styled.div`
  color: ${themeColor.main.coffemilk};
  font-size: 20px;
  white-space: nowrap;
  margin: 10px 20px;
`;
