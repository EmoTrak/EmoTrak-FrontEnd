import React, { useEffect, useState } from "react";
import { useEmailValidation } from "../hooks/useEmailValidation";
import { useNicknameValidation } from "../hooks/useNicknameValidation";
import { usePasswordCheck } from "../hooks/usePasswordCheck";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import InputList from "../../mypage/components/InputList";
import { MyPageHelperText, MyPageInput } from "../../mypage/styles/MypageStyle";
import Button from "../../../components/Button";
import { InfoType, SignInfo } from "../../../data/type/type";
import * as St from "../styles/SignupFormStyle";
import {
  ButtonBox,
  Form,
  FormTitle,
  FormWrapper,
} from "../../login/styles/LoginFormStyle";

const SignupForm = () => {
  const navigate = useNavigate();
  const [signInfo, setSignInfo] = useState<InfoType & SignInfo>({
    email: "",
    nickname: "",
    password: "",
    emailCheck: "",
    rePassword: "",
  });
  const [regExpPassword, setRegExpPassword] = useState<boolean>(false);
  const [emailConfirm, setEmailConfirm] = useState<boolean>(false);
  const { validEmail, checkEmail, emailValidation, setEmailValidation } =
    useEmailValidation();

  const checkEmailConfirm = () => {
    if (String(signInfo.emailCheck) === checkEmail.data?.data.data) {
      return setEmailConfirm(true);
    }
    alert("인증에 실패하였습니다");
  };

  const {
    validNickname,
    checkNickname,
    nicknameValidation,
    setNicknameValidation,
  } = useNicknameValidation();

  const { validPassword, checkPasswordHandler, doublePassword } =
    usePasswordCheck(signInfo.password);
  const { signup } = useSignup();

  const changeInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setSignInfo({ ...signInfo, [name]: value });

    const inputName = new Map([
      ["nickname", () => setNicknameValidation(false)],
      ["password", () => setRegExpPassword(validPassword(event.target.value))],
      ["email", () => setEmailValidation(false)],
      ["rePassword", () => checkPasswordHandler(event.target.value)],
    ]);
    const func = inputName.get(name);
    return func && func();
  };

  const checkEmailHandler = (item: string) => {
    if (validEmail(item)) {
      checkEmail.mutate(item);
    } else {
      setEmailValidation(false);
      alert("이메일 형식에 맞게 입력해주세요.");
    }
  };
  const checkNicknameHandler = (item: string) => {
    if (validNickname(item)) {
      checkNickname.mutate(item);
    } else {
      setNicknameValidation(false);
      alert("8글자 이하로 입력해주세요.");
    }
  };

  const submitInfoHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      nicknameValidation &&
      validPassword(signInfo.password) &&
      emailConfirm
    ) {
      const submitInfo = {
        email: signInfo.email,
        nickname: signInfo.nickname,
        password: signInfo.password,
      };
      signup.mutate(submitInfo);
    } else if (!emailConfirm) {
      alert("이메일 인증이 필요합니다");
    } else {
      alert("입력한 내용을 확인해주세요 !");
    }
  };
  useEffect(() => {
    const preventGoBack = () => {
      if (window.confirm("페이지를 나가시겠습니까?")) {
        navigate("/");
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    // 새로고침 막기 변수
    const preventClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <FormWrapper>
      <Form onSubmit={submitInfoHandler}>
        <FormTitle>
          <span>회원가입</span>
          <p />
        </FormTitle>
        <InputList name="이메일">
          <St.SignFormContentBox>
            <MyPageInput
              type="text"
              name="email"
              value={signInfo.email}
              maxLength={35}
              spellCheck={false}
              onChange={changeInputHandler}
              disabled={emailValidation}
            />
            {!signInfo.email ? (
              <MyPageHelperText important>
                이메일 형식으로 입력해주세요
              </MyPageHelperText>
            ) : !emailValidation ? (
              <MyPageHelperText important>
                중복확인이 필요합니다.
              </MyPageHelperText>
            ) : !emailConfirm ? (
              <MyPageHelperText important>
                메일로 전송된 인증번호를 입력해주세요.
              </MyPageHelperText>
            ) : (
              <MyPageHelperText> 이메일인증이 완료되었습니다.</MyPageHelperText>
            )}
            <Button
              type="button"
              onClick={() => checkEmailHandler(signInfo.email)}
              disabled={!signInfo.email || emailValidation}
            >
              중복확인
            </Button>
            {emailValidation && !emailConfirm && (
              <>
                <MyPageInput
                  type="text"
                  name="emailCheck"
                  value={signInfo.emailCheck}
                  maxLength={8}
                  spellCheck={false}
                  onChange={changeInputHandler}
                />
                <Button type="button" onClick={checkEmailConfirm}>
                  인증하기
                </Button>
              </>
            )}
          </St.SignFormContentBox>
        </InputList>
        <InputList name="닉네임">
          <St.SignFormContentBox>
            <MyPageInput
              type="text"
              name="nickname"
              value={signInfo.nickname}
              maxLength={8}
              onChange={changeInputHandler}
            />
            {!signInfo.nickname ? (
              <MyPageHelperText important>
                8글자 이하로 입력해주세요.
              </MyPageHelperText>
            ) : nicknameValidation ? (
              <MyPageHelperText>사용할 수 있는 닉네임입니다.</MyPageHelperText>
            ) : (
              <MyPageHelperText important>
                중복확인이 필요합니다.
              </MyPageHelperText>
            )}
            <Button
              type="button"
              onClick={() => checkNicknameHandler(signInfo.nickname)}
              disabled={!signInfo.nickname || nicknameValidation}
            >
              중복확인
            </Button>
          </St.SignFormContentBox>
        </InputList>
        <InputList name="비밀번호">
          <St.SignFormContentBox>
            <MyPageInput
              type="password"
              name="password"
              value={signInfo.password}
              maxLength={15}
              onChange={changeInputHandler}
            />
            {!regExpPassword ? (
              <MyPageHelperText important>
                비밀번호는 소문자, 숫자를 포함하는 8~15자리이어야합니다.
              </MyPageHelperText>
            ) : (
              <MyPageHelperText></MyPageHelperText>
            )}
          </St.SignFormContentBox>
        </InputList>
        <InputList name="비밀번호확인">
          <St.SignFormContentBox>
            <MyPageInput
              type="password"
              name="rePassword"
              maxLength={15}
              onChange={changeInputHandler}
            />
            {!signInfo.rePassword ? (
              <MyPageHelperText important>
                비밀번호를 다시 입력해주세요.
              </MyPageHelperText>
            ) : doublePassword ? (
              <MyPageHelperText>비밀번호가 일치합니다.</MyPageHelperText>
            ) : (
              <MyPageHelperText important>
                비밀번호가 일치하지 않습니다.
              </MyPageHelperText>
            )}
          </St.SignFormContentBox>
        </InputList>
        <ButtonBox>
          <Button
            size="large"
            type="submit"
            disabled={!nicknameValidation || !emailConfirm || !doublePassword}
          >
            가입하기
          </Button>
        </ButtonBox>
      </Form>
    </FormWrapper>
  );
};

export default SignupForm;
