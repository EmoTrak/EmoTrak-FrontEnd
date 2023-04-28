import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  SIGN_UP_PAGE,
} from "../../../data/routes/urls";
import { useLogin } from "../hooks/useLogin";
import Button from "../../../components/Button";
import InputList from "../../mypage/components/InputList";
import Kakao from "../../../assets/Social/Kakao.svg";
import Naver from "../../../assets/Social/Naver.svg";
import Google from "../../../assets/Social/Google.svg";
import LoginTitle from "../../../assets/Texts/Login.svg";
import * as St from "../styles/LoginFormStyle";
import { MyPageInput } from "../../mypage/styles/MypageStyle";

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
            spellCheck={false}
            maxLength={30}
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
            size={13}
            type="button"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          >
            <img src={Kakao} alt="카카오로그인" />
          </St.SocialLoginButton>
        </St.SocialButtonLabel>
        <St.SocialButtonLabel>
          <St.SocialLoginButton
            size={13}
            type="button"
            onClick={() => {
              window.location.href = NAVER_AUTH_URL;
            }}
          >
            <img src={Naver} alt="네이버로그인" />
          </St.SocialLoginButton>
        </St.SocialButtonLabel>
        <St.SocialButtonLabel>
          <St.SocialLoginButton
            size={15}
            type="button"
            onClick={() => {
              window.location.href = GOOGLE_AUTH_URL;
            }}
          >
            <img src={Google} alt="구글로그인" />
          </St.SocialLoginButton>
        </St.SocialButtonLabel>
      </St.SocialButtonBox>
    </St.FormWrapper>
  );
};

export default LoginForm;
