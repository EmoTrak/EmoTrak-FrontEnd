import { useNavigate } from "react-router-dom";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  SIGN_UP_PAGE,
} from "../../../data/routes/urls";
import styled from "styled-components";
import { useLogin } from "../hooks/useLogin";
import InputList from "../../mypage/components/InputList";
import { MyPageInput } from "../../../pages/Mypage";
import { IconProps } from "../../../pages/DrawingPost";
import Kakao from "../../../assets/Social/Kakao.webp";
import Naver from "../../../assets/Social/Naver.webp";
import Google from "../../../assets/Social/Google.webp";
import KakaoMobile from "../../../assets/Social/KakaoMobile.webp";
import NaverMobile from "../../../assets/Social/NaverMobile.webp";
import GoogleMobile from "../../../assets/Social/GoogleMobile.webp";
import LoginTitle from "../../../assets/Texts/Login.svg";
import Button from "../../../components/Button";
import { device, themeColor } from "../../../utils/theme";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const windowWidth = {
    desktop: viewportWidth < 1920 && viewportWidth > 1024,
    tablet: viewportWidth < 1024 && viewportWidth > 767,
    mobile: viewportWidth < 768,
  };

  const { loginInfo, submitFormHandler, changeInputHandler } = useLogin();

  return (
    <StFormWrapper>
      <StForm id="login" onSubmit={submitFormHandler}>
        <FormTitle url={LoginTitle} size={5} />
        <InputList name="ID">
          <MyPageInput
            type="text"
            name="email"
            value={loginInfo.email}
            maxLength={25}
            onChange={changeInputHandler}
          />
        </InputList>
        <InputList name="PASSWORD">
          <MyPageInput
            type="password"
            name="password"
            value={loginInfo.password}
            maxLength={15}
            onChange={changeInputHandler}
          />
        </InputList>
      </StForm>
      <ButtonBox>
        <Button circle size="circle" type="submit" form="login">
          로그인
        </Button>
        <Button
          circle
          size="circle"
          type="button"
          onClick={() => navigate(SIGN_UP_PAGE)}
        >
          회원가입
        </Button>
      </ButtonBox>
      <SocialButtonBox>
        <SocialButtonLabel>
          <SocialLoginButton
            url={Kakao}
            size={13}
            type="button"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          ></SocialLoginButton>
        </SocialButtonLabel>
        <SocialButtonLabel>
          <SocialLoginButton
            url={Naver}
            size={13}
            type="button"
            onClick={() => {
              window.location.href = NAVER_AUTH_URL;
            }}
          ></SocialLoginButton>
        </SocialButtonLabel>
        <SocialButtonLabel>
          <SocialLoginButton
            url={Google}
            size={13}
            type="button"
            onClick={() => {
              window.location.href = GOOGLE_AUTH_URL;
            }}
          ></SocialLoginButton>
        </SocialButtonLabel>
      </SocialButtonBox>
    </StFormWrapper>
  );
};

export default LoginForm;

export const StFormWrapper = styled.div`
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

export const StForm = styled.form`
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

export const SocialLoginButton = styled.button<IconProps>`
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

export const FormTitle = styled.div<IconProps>`
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
