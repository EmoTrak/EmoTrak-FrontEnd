import React, { useCallback, useEffect, useState } from "react";
import Flex from "../../../components/Flex";
import { SignInfo } from "../../../data/type/d3";
import { useEmailValidation } from "../hooks/useEmailValidation";
import { useNicknameValidation } from "../hooks/useNicknameValidation";
import { usePasswordCheck } from "../hooks/usePasswordCheck";
import { useSignup } from "../hooks/useSignup";
import { FormTitle, StFormWrapper } from "../../login/components/LoginForm";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE, SIGN_UP_PAGE } from "../../../data/routes/urls";
import { getCookie } from "../../../utils/cookies";
import InputList from "../../mypage/components/InputList";
import { MyPageInput } from "../../../pages/Mypage";
import SignupTitle from "../../../assets/Texts/Signup.svg";

const SignupForm = () => {
  const navigate = useNavigate();
  const token = getCookie("token");
  const [signInfo, setSignInfo] = useState<SignInfo>({
    email: "",
    nickname: "",
    password: "",
  });

  const [checkPassword, setCheckPassword] = useState<string>("");

  const { validEmail, checkEmail, emailValidation, setEmailValidation } =
    useEmailValidation();
  const {
    validNickname,
    checkNickname,
    nicknameValidation,
    setNicknameValidation,
  } = useNicknameValidation();
  const { validPassword, checkPasswordHandler } = usePasswordCheck(
    signInfo.password
  );
  const { signup } = useSignup();

  const changeInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setSignInfo({ ...signInfo, [name]: value });
    if (name === "nickname") {
      setNicknameValidation(false);
      setSignInfo({ ...signInfo, [name]: value });
    }
    if (name === "email") {
      setEmailValidation(false);
      setSignInfo({ ...signInfo, [name]: value });
    }
  };

  const checkPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCheckPassword(value);
  };

  const checkEmailHandler = (item: string) => {
    if (validEmail(item)) {
      checkEmail.mutate(item);
    } else {
      setSignInfo({ ...signInfo, email: "" });
      setEmailValidation(false);
      alert("이메일 형식에 맞게 입력해주세요.");
    }
  };

  const checkNicknameHandler = (item: string) => {
    if (validNickname(item)) {
      checkNickname.mutate(item);
    } else {
      setSignInfo({ ...signInfo, nickname: "" });
      setNicknameValidation(false);
      alert("8글자 이하로 입력해주세요.");
    }
  };

  const submitInfoHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      emailValidation &&
      nicknameValidation &&
      validPassword(signInfo.password)
    ) {
      signup.mutate(signInfo);
    } else {
      alert("입력한 내용을 확인해주세요 !");
    }
  };
  useEffect(() => {
    if (token) {
      navigate(`${LOGIN_PAGE}`);
    }
    const preventGoBack = () => {
      if (window.confirm("페이지를 나가시겠습니까?")) {
        navigate(-1);
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    // 새로고침 막기 변수
    const preventClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
      window.removeEventListener("beforeunload", preventClose);
    };
  }, [token]);

  return (
    <StFormWrapper>
      <form onSubmit={submitInfoHandler}>
        <Flex>
          <FormTitle url={SignupTitle} size={6} />
          <InputList name="이메일" important>
            <label>
              <SignFormContentBox>
                <MyPageInput
                  type="text"
                  name="email"
                  value={signInfo.email}
                  maxLength={25}
                  onChange={(e) => changeInputHandler(e)}
                />
                <button
                  type="button"
                  onClick={() => checkEmailHandler(signInfo.email)}
                  disabled={emailValidation}
                >
                  중복확인
                </button>
                {signInfo.email ? (
                  emailValidation ? (
                    <span>사용할 수 있는 아이디입니다.</span>
                  ) : (
                    <StWarningMessage>중복확인이 필요합니다.</StWarningMessage>
                  )
                ) : (
                  <StWarningMessage>
                    이메일 형식으로 입력해주세요.
                  </StWarningMessage>
                )}
              </SignFormContentBox>
            </label>
          </InputList>
          <InputList name="닉네임" important>
            <label>
              <SignFormContentBox>
                <MyPageInput
                  type="text"
                  name="nickname"
                  value={signInfo.nickname}
                  maxLength={8}
                  onChange={(e) => changeInputHandler(e)}
                />
                <button
                  type="button"
                  onClick={() => checkNicknameHandler(signInfo.nickname)}
                  disabled={nicknameValidation}
                >
                  중복확인
                </button>
                {signInfo.nickname ? (
                  nicknameValidation ? (
                    <span>사용할 수 있는 닉네임입니다.</span>
                  ) : (
                    <StWarningMessage>중복확인이 필요합니다.</StWarningMessage>
                  )
                ) : (
                  <span></span>
                )}
              </SignFormContentBox>
            </label>
          </InputList>
          <InputList name="비밀번호" important>
            <label>
              <SignFormContentBox>
                <MyPageInput
                  type="password"
                  name="password"
                  value={signInfo.password}
                  maxLength={15}
                  onChange={(e) => changeInputHandler(e)}
                />
                {7 < Number(signInfo.password.length) ? null : (
                  <StWarningMessage>
                    영소문자, 숫자를 포함하는 8~15자리이어야합니다.
                  </StWarningMessage>
                )}
              </SignFormContentBox>
            </label>
          </InputList>
          <InputList name="비밀번호 확인">
            <label>
              <SignFormContentBox>
                <MyPageInput
                  type="password"
                  value={checkPassword}
                  maxLength={15}
                  onChange={(e) => checkPasswordChangeHandler(e)}
                />
                {checkPassword ? (
                  checkPasswordHandler(checkPassword) ? (
                    <span>비밀번호가 일치합니다.</span>
                  ) : (
                    <StWarningMessage>
                      비밀번호가 일치하지 않습니다.
                    </StWarningMessage>
                  )
                ) : (
                  <span>비밀번호를 다시 입력해주세요.</span>
                )}
              </SignFormContentBox>
            </label>
          </InputList>
          <button type="submit">가입하기</button>
        </Flex>
      </form>
    </StFormWrapper>
  );
};

export default SignupForm;

const StWarningMessage = styled.span`
  color: red;
`;

const SignFormContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vh;
`;
