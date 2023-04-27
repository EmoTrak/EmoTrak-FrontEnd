import { useNavigate } from "react-router-dom";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  SIGN_UP_PAGE,
} from "../../../data/routes/urls";
import { useLogin } from "../hooks/useLogin";
import InputList from "../../mypage/components/InputList";
import { MyPageInput } from "../../mypage/styles/MypageStyle";
import Kakao from "../../../assets/Social/Kakao.webp";
import Naver from "../../../assets/Social/Naver.webp";
import Google from "../../../assets/Social/Google.webp";
import LoginTitle from "../../../assets/Texts/Login.svg";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import * as St from "../styles/LoginFormStyle";

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
    <St.FormWrapper>
      <St.Form id="login" onSubmit={submitFormHandler}>
        <St.FormTitle url={LoginTitle} size={5} />
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
      </St.Form>
      <St.ButtonBox>
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
      </St.ButtonBox>
      <St.SocialButtonBox>
        <St.SocialButtonLabel>
          <St.SocialLoginButton
            url={Kakao}
            size={13}
            type="button"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          ></St.SocialLoginButton>
        </St.SocialButtonLabel>
        <St.SocialButtonLabel>
          <St.SocialLoginButton
            url={Naver}
            size={13}
            type="button"
            onClick={() => {
              window.location.href = NAVER_AUTH_URL;
            }}
          ></St.SocialLoginButton>
        </St.SocialButtonLabel>
        <St.SocialButtonLabel>
          <St.SocialLoginButton
            url={Google}
            size={13}
            type="button"
            onClick={() => {
              window.location.href = GOOGLE_AUTH_URL;
            }}
          ></St.SocialLoginButton>
        </St.SocialButtonLabel>
      </St.SocialButtonBox>
    </St.FormWrapper>
  );
};

export default LoginForm;
