import React, { useState } from "react";
import Flex from "../../../components/Flex";
import { SignInfo } from "../../../data/type/d3";
import { useEmailValidation } from "../hooks/useEmailValidation";
import { useNicknameValidation } from "../hooks/useNicknameValidation";
import { usePasswordCheck } from "../hooks/usePasswordCheck";
import { useSignup } from "../hooks/useSignup";
import { StFormWrapper } from "../../login/components/LoginForm";

const SignupForm = () => {
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

  return (
    <StFormWrapper>
      <form onSubmit={submitInfoHandler}>
        <Flex jc="center" ai="center">
          <label>
            이메일
            <input
              type="text"
              name="email"
              value={signInfo.email}
              maxLength={25}
              onChange={(e) => changeInputHandler(e)}
            />
            <button
              type="button"
              onClick={() => checkEmailHandler(signInfo.email)}
            >
              중복확인
            </button>
            {signInfo.email ? (
              emailValidation ? (
                <span>사용할 수 있는 아이디입니다.</span>
              ) : (
                <span>중복확인이 필요합니다.</span>
              )
            ) : null}
          </label>
          <label>
            닉네임
            <input
              type="text"
              name="nickname"
              value={signInfo.nickname}
              maxLength={8}
              onChange={(e) => changeInputHandler(e)}
            />
            <button
              type="button"
              onClick={() => checkNicknameHandler(signInfo.nickname)}
            >
              중복확인
            </button>
            {signInfo.nickname ? (
              nicknameValidation ? (
                <span>사용할 수 있는 닉네임입니다.</span>
              ) : (
                <span>중복확인이 필요합니다.</span>
              )
            ) : null}
          </label>
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              value={signInfo.password}
              maxLength={15}
              onChange={(e) => changeInputHandler(e)}
            />
          </label>
          <label>
            비밀번호 확인
            <input
              type="password"
              value={checkPassword}
              maxLength={15}
              onChange={(e) => checkPasswordChangeHandler(e)}
            />
            {checkPassword ? (
              checkPasswordHandler(checkPassword) ? (
                <span>비밀번호가 일치합니다.</span>
              ) : (
                <span>
                  비밀번호는 소문자, 숫자를 포함하는 8~15자리이어야합니다.
                </span>
              )
            ) : null}
          </label>
          <button type="submit">가입하기</button>
        </Flex>
      </form>
    </StFormWrapper>
  );
};

export default SignupForm;
