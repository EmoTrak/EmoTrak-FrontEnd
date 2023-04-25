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
import { device } from "../../../utils/theme";
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
          <label>
            <MyPageInput
              type="text"
              name="email"
              value={loginInfo.email}
              maxLength={25}
              onChange={changeInputHandler}
            />
          </label>
        </InputList>
        <InputList name="PASSWORD">
          <label>
            <MyPageInput
              type="password"
              name="password"
              value={loginInfo.password}
              maxLength={15}
              onChange={changeInputHandler}
            />
          </label>
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
      <ButtonBox>
        {windowWidth.mobile || windowWidth.tablet ? (
          <>
            <SocialButtonLabel>
              <SocialLoginButton
                url={KakaoMobile}
                size={13}
                type="button"
                style={{ margin: "0.5vh" }}
                onClick={() => {
                  window.location.href = KAKAO_AUTH_URL;
                }}
              ></SocialLoginButton>
            </SocialButtonLabel>
            <SocialButtonLabel>
              <SocialLoginButton
                url={NaverMobile}
                size={13}
                type="button"
                onClick={() => {
                  window.location.href = NAVER_AUTH_URL;
                }}
              ></SocialLoginButton>
            </SocialButtonLabel>
            <SocialButtonLabel>
              <SocialLoginButton
                url={GoogleMobile}
                size={13}
                type="button"
                onClick={() => {
                  window.location.href = GOOGLE_AUTH_URL;
                }}
              ></SocialLoginButton>
            </SocialButtonLabel>
          </>
        ) : (
          <>
            {" "}
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
          </>
        )}
      </ButtonBox>
    </StFormWrapper>
  );
};

export default LoginForm;

export const StFormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 82vh;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

const StForm = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 10;
  justify-content: center;
  align-items: center;
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
    width: 20vw;
    height: 20vw;
    gap: 5;
    margin: 0;
  }
  ${device.mobile} {
    width: 20vw;
    height: 20vw;
    gap: 5;
    margin: 0;
  }
  ${device.miniMobile} {
    width: 30vw;
    height: 30vw;
    gap: 5;
    margin: 0;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  margin: 10px;
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
  ${device.mobile} {
    width: 13vw;
  }
  ${device.miniMobile} {
    width: 13vw;
  }
`;
