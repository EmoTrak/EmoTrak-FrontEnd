import styled from "styled-components";
import { SizeType } from "../../../data/type/type";
import { device, themeColor } from "../../../utils/theme";

export const LoginPageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
`;
export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  ${device.tablet} {
    background-color: ${themeColor.main.white};
  }
`;

export const Form = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 5;
  align-items: center;
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

export const FormTitle = styled.div`
  margin: 50px 15px 25px;
  display: flex;
  justify-content: center;
  color: ${themeColor.main.chocomilk};
  position: relative;
  span {
    font-size: 21px;
    position: relative;
    z-index: 3;
  }
  p {
    background-color: ${themeColor.emoticon.yellow};
    border-radius: 10px;
    width: 80px;
    height: 16px;
    position: absolute;
    top: 7px;
    z-index: 2;
  }
`;
