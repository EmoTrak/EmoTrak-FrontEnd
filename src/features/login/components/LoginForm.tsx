import { useNavigate } from "react-router-dom";
import {
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  SIGN_UP_PAGE,
} from "../../../data/routes/urls";
import styled from "styled-components";
import Flex from "../../../components/Flex";
import { useLogin } from "../hooks/useLogin";
import InputList from "../../mypage/components/InputList";
import { MyPageInput } from "../../../pages/Mypage";
import { IconProps } from "../../../pages/DrawingPost";
import Kakao from "../../../assets/Social/Kakao.svg";
import Naver from "../../../assets/Social/Naver.svg";
import Google from "../../../assets/Social/Google.svg";
import LoginTitle from "../../../assets/Texts/Login.svg";

const LoginForm = () => {
  const navigate = useNavigate();

  const { loginInfo, submitFormHandler, changeInputHandler } = useLogin();

  return (
    <StFormWrapper>
      <form id="login" onSubmit={submitFormHandler}>
        <Flex gap={10}>
          <FormTitle url={LoginTitle} size={3.3} />
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
        </Flex>
      </form>
      <ButtonBox>
        <button type="submit" form="login">
          로그인
        </button>
        <button type="button" onClick={() => navigate(SIGN_UP_PAGE)}>
          회원가입
        </button>
      </ButtonBox>
      <ButtonBox>
        <SocialButtonLabel>
          <SocialLoginButton
            url={Kakao}
            size={2.25}
            type="button"
            style={{ margin: "0.5vh" }}
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          ></SocialLoginButton>
          카카오로 로그인하기
        </SocialButtonLabel>
        <SocialButtonLabel>
          <SocialLoginButton
            url={Naver}
            size={2.7}
            type="button"
            onClick={() => {
              window.location.href = NAVER_AUTH_URL;
            }}
          ></SocialLoginButton>
          네이버로 로그인하기
        </SocialButtonLabel>
        <SocialButtonLabel>
          <SocialLoginButton
            url={Google}
            size={2.7}
            type="button"
            onClick={() => {
              // window.location.href = NAVER_AUTH_URL;
            }}
          ></SocialLoginButton>
          구글로 로그인하기
        </SocialButtonLabel>
      </ButtonBox>
    </StFormWrapper>
  );
};

export default LoginForm;

export const StFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  /* border: 1px solid; */
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
  height: ${({ size }) => `${size}vw`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  align-items: center;
  gap: 1.7vw;
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
  margin: 2vh 6vh;
`;
