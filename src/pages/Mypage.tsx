import React, { useEffect, useState } from "react";
import { useAuth } from "../features/mypage/hooks/useAuth";
import { usePasswordCheck } from "../features/signup/hooks/usePasswordCheck";
import { useNicknameValidation } from "../features/signup/hooks/useNicknameValidation";
import { useChangePassword } from "../features/mypage/hooks/useChangePassword";
import { useChangeNickname } from "../features/mypage/hooks/useChangeNickname";
import { useWithdrawal } from "../features/mypage/hooks/useWithdrawal";

type InfoType = {
  email: string;
  nickname: string;
  password: string;
  rePassword: string;
};

const Mypage = () => {
  const { isLoading, userInfo } = useAuth();
  const { withdraw } = useWithdrawal();

  const [info, setInfo] = useState<InfoType>({
    email: userInfo?.email,
    nickname: userInfo?.nickname,
    password: "",
    rePassword: "",
  });

  const {
    checkNickname,
    validNickname,
    setNicknameValidation,
    nicknameValidation,
  } = useNicknameValidation();
  const { validPassword, checkPasswordHandler } = usePasswordCheck(
    info.password
  );

  const { changePassword } = useChangePassword();
  const { changeNickname } = useChangeNickname();

  const checkNicknameHandler = (item: string) => {
    if (validNickname(item)) {
      checkNickname.mutate(item);
    } else {
      setInfo({ ...info, nickname: "" });
      setNicknameValidation(false);
      alert("8글자 이하로 입력해주세요.");
    }
  };

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const withdrawUserHandler = () => {
    withdraw.mutate();
  };

  useEffect(() => {
    if (userInfo) {
      setInfo({
        email: userInfo?.email,
        nickname: userInfo?.nickname,
        password: "",
        rePassword: "",
      });
    }
  }, [userInfo]);

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <div>
        <label>
          이메일 <input type="text" name="email" value={info.email} disabled />
        </label>
        <label>
          닉네임
          <input
            type="text"
            name="nickname"
            value={info.nickname}
            onChange={changeInputHandler}
          />
        </label>
        <button onClick={() => checkNicknameHandler(info.nickname)}>
          닉네임 중복확인
        </button>
        <button
          disabled={!nicknameValidation}
          onClick={() => changeNickname.mutate(info.nickname)}
        >
          닉네임 변경
        </button>
        <label>
          변경 비밀번호
          <input
            name="password"
            type="password"
            value={info.password}
            onChange={changeInputHandler}
            disabled={userInfo?.hasSocial}
          />
        </label>
        {validPassword(info.password) ? null : (
          <span>비밀번호는 소문자, 숫자를 포함하는 8~15자리이어야합니다.</span>
        )}
        <label>
          변경 비밀번호 확인
          <input
            name="rePassword"
            type="password"
            value={info.rePassword}
            onChange={changeInputHandler}
            disabled={userInfo?.hasSocial}
          />
        </label>
        {info.password ? (
          checkPasswordHandler(info.rePassword) ? (
            <span>비밀번호가 일치합니다.</span>
          ) : (
            <span>비밀번호가 일치하지 않습니다.</span>
          )
        ) : null}
        <button
          disabled={
            info.password === "" ||
            validPassword(info.password) === false ||
            checkPasswordHandler(info.rePassword) === false
          }
          onClick={() => changePassword.mutate(info.password)}
        >
          비밀번호 변경
        </button>
        <button onClick={withdrawUserHandler}>회원탈퇴</button>
      </div>
    </>
  );
};

export default Mypage;
