import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const CanvasWrapper = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MobileStarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  ${device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;
export const ImagePostWrap = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    width: 100%;
    height: 50%;
    p {
      display: none;
    }
  }
`;
export const ImageWrap = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    width: 100%;
    height: 50%;
    margin: 0;
  }
`;
export const StarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    margin-bottom: 20px;
    gap: 35px;
  }
`;
export const PhotoInputBox = styled.li`
  width: 40vw;
  height: 70vh;
  position: relative;
  border: 1px solid ${themeColor.main.paper};
  background: ${themeColor.main.oatmeal};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${themeColor.main.coffemilk};
  font-size: 1rem;
  border-radius: 30px;
  margin-right: 1rem;

  ::before {
    content: "드래그 또는 파일을 선택하여 사진을 첨부해주세요";
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 30px;
    width: 40vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 20px;
  }

  ${device.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85vw;
    height: 50vh;
    margin: 0;
  }
`;

export const PhotoInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  cursor: pointer;
  font-size: 0px;
`;

export const PhotoPreviewImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  position: relative;
  ${device.mobile} {
    position: unset;
    border-radius: 20px;
    padding: 20px;
    margin: 0;
  }
`;

export const PhotoPreview = styled.div`
  width: 45vw;
  margin-top: 50px;
  max-height: 800px;
  position: relative;
  display: flex;
  justify-content: center;
  ${device.mobile} {
    width: 90vw;
    margin-top: 0px;
    overflow-y: hidden;
  }
`;
export const DeletePhotoButton = styled.button`
  width: 50px;
  height: 30px;
  border: 0px;
  border-radius: 10px;
  margin: 20px;
  background-color: ${themeColor.main.paper};
  color: ${themeColor.main.chocomilk};
  font-family: inherit;
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;

  &:hover {
    background-color: ${themeColor.main.coffemilk};
    color: ${themeColor.main.white};
    border: 3px solid ${themeColor.main.oatmeal};
  }
  ${device.mobile} {
    top: 10px;
    right: 10px;
  }
`;

export const ScoreBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 45vw;
  ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  width: 41vw;
  height: 50vh;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 20px;
  font-family: inherit;
  line-height: 2;
  margin: 20px;
  padding: 10px;

  ${device.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    width: 80vw;
    height: 50vh;
    padding: 20px;
    margin: 0;
  }
`;

export const SubmitBox = styled.div`
  width: 40vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${device.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60vw;
    height: 50vh;
  }
`;

export const PhotoInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    width: 100vw;
  }
`;

export const Label = styled.label`
  font-size: 20px;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  ${device.mobile} {
    width: 50vw;
    font-size: 15px;
  }
`;
