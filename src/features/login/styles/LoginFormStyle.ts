import styled from "styled-components";
import { SizeType, UrlType } from "../../../data/type/type";
import { device, themeColor } from "../../../utils/theme";

export const LoginPageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  ${device.tablet} {
    height: 100vh;
  }
`;
export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* justify-content: center; */
  align-items: center;
  overflow: scroll;
  ${device.tablet} {
    height: 120vh;
    background-color: ${themeColor.main.white};
    margin-top: 15vh;
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
`;

export const SocialLoginButton = styled.button<SizeType>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: ${({ size }) => `${size}vw`};
  height: 3.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.tablet} {
    width: 30vw;
    height: 7vw;
    margin: 0;
  }
  ${device.mobile} {
    width: 35vw;
    height: 8.5vw;
  }
  ${device.miniMobile} {
    width: 50vw;
    height: 12.5vw;
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
    margin-top: 20vh;
  }
  ${device.miniMobile} {
    width: 20vw;
    height: 20vw;
  }
`;
