import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as URL from "../data/routes/urls";
import { getCookie } from "../utils/cookies";
import { scrollOnTop } from "../utils/scollOnTop";
import InputList from "../components/InputList";
import Button from "../components/Button";
import Flex from "../components/Flex";
import { useLogin } from "../features/login/hooks/useLogin";
import * as St from "../features/login/styles/LoginFormStyle";
import { MyPageInput } from "../features/mypage/styles/MypageStyle";
import Kakao from "../assets/Social/Kakao.svg";
import Naver from "../assets/Social/Naver.svg";
import Google from "../assets/Social/Google.svg";

const Login = () => {
  scrollOnTop();

  const navigate = useNavigate();

  const { loginInfo, submitFormHandler, changeInputHandler } = useLogin();

  return (
    <St.FormWrapper>
      <St.Form id="login" onSubmit={submitFormHandler}>
        <St.FormTitle>
          <span>로그인</span>
          <p />
        </St.FormTitle>
        <InputList name="아이디(이메일)">
          <MyPageInput
            type="text"
            name="email"
            value={loginInfo.email}
            spellCheck={false}
            maxLength={30}
            onChange={changeInputHandler}
          />
        </InputList>
        <InputList name="비밀번호">
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
          onClick={() => navigate(URL.SIGN_UP_PAGE)}
        >
          회원가입
        </Button>
      </St.ButtonBox>
      <St.SocialButtonBox>
        <Flex jc="center" ai="center">
          <St.SocialLoginButton
            size={13}
            type="button"
            onClick={() => {
              window.location.href = URL.KAKAO_AUTH_URL;
            }}
          >
            <img src={Kakao} alt="카카오로그인" />
          </St.SocialLoginButton>
        </Flex>
        <Flex jc="center" ai="center">
          <St.SocialLoginButton
            size={13}
            type="button"
            onClick={() => {
              window.location.href = URL.NAVER_AUTH_URL;
            }}
          >
            <img src={Naver} alt="네이버로그인" />
          </St.SocialLoginButton>
        </Flex>
        <Flex jc="center" ai="center">
          <St.SocialLoginButton
            size={15}
            type="button"
            onClick={() => {
              window.location.href = URL.GOOGLE_AUTH_URL;
            }}
          >
            <img src={Google} alt="구글로그인" />
          </St.SocialLoginButton>
        </Flex>
      </St.SocialButtonBox>
    </St.FormWrapper>
  );
};

export default Login;
