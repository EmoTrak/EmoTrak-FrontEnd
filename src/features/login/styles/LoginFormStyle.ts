import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";
import { SizeType, UrlType } from "../../../data/type/type";

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  padding: 10px;
  ${device.tablet} {
    height: 120vh;
    background-color: ${themeColor.main.white};
  }
  ${device.mobile} {
    height: 120vh;
    background-color: ${themeColor.main.white};
  }
  ${device.miniMobile} {
    height: 120vh;
    background-color: ${themeColor.main.white};
  }
`;

export const Form = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 10;
  justify-content: center;
  align-items: center;
  ${device.tablet} {
    gap: 5;
  }
  ${device.mobile} {
    gap: 5;
  }
`;

export const SocialLoginButton = styled.button<SizeType & UrlType>`
  background-image: ${({ url }) => `url(${url})`};
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: ${({ size }) => `${size}vw`};
  height: 3.5vw;
  /* height: ${({ size }) => `${size}vh`}; */
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.tablet} {
    width: 30vw;
    height: 7vw;
    gap: 5;
    margin: 0;
  }
  ${device.mobile} {
    width: 35vw;
    height: 8.5vw;
    gap: 5;
    margin: 0;
  }
  ${device.miniMobile} {
    width: 50vw;
    height: 12.5vw;
    gap: 5;
    margin: 0;
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  margin: 10px;
`;

export const SocialButtonBox = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  margin: 10px;
  ${device.tablet} {
    flex-direction: column;
  }
  ${device.mobile} {
    flex-direction: column;
  }
  ${device.miniMobile} {
    flex-direction: column;
  }
`;

export const SocialButtonLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormTitle = styled.div<SizeType & UrlType>`
  background-image: ${({ url }) => `url(${url})`};
  background-color: transparent;
  border: none;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: ${({ size }) => `${size}vw`};
  height: ${({ size }) => `${size}vw`};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5vh 6vh;
  ${device.tablet} {
    width: 12vw;
    height: 12vw;
    margin-top: 25vh;
  }
  ${device.mobile} {
    width: 12vw;
    height: 12vw;
    margin-top: 20vh;
  }
  ${device.miniMobile} {
    width: 20vw;
    height: 20vw;
    margin-top: 20vh;
  }
`;
