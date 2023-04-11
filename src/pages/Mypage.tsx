import React, { useState } from "react";
import { useAuth } from "../features/mypage/hooks/useAuth";
import { usePasswordCheck } from "../features/signup/hooks/usePasswordCheck";
import { useNicknameValidation } from "../features/signup/hooks/useNicknameValidation";
import { useChangePassword } from "../features/mypage/hooks/useChangePassword";
import { useChangeNickname } from "../features/mypage/hooks/useChangeNickname";

type InfoType = {
  email: string;
  nickname: string;
  password: string;
  rePassword: string;
};

const Mypage = () => {
  const { data, isLoading, userInfo } = useAuth();
  const [info, setInfo] = useState<InfoType>({
    email: userInfo.email,
    nickname: userInfo.nickname,
    password: "",
    rePassword: "",
  });

  const { checkNickname, validNickname, setNicknameValidation } =
    useNicknameValidation();
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

  return (
    <>
      <div>
        <label>
          이메일 <input type="text" value={info.email} disabled />
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
        <button onClick={() => changeNickname.mutate(info.nickname)}>
          닉네임 변경
        </button>
        <label>
          변경 비밀번호
          <input
            name="password"
            type="password"
            value={info.password}
            onChange={changeInputHandler}
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
          />
        </label>
        {info.password ? (
          checkPasswordHandler(info.rePassword) ? (
            <span>비밀번호가 일치합니다.</span>
          ) : (
            <span>비밀번호가 일치하지 않습니다.</span>
          )
        ) : null}
        <button onClick={() => changePassword.mutate(info.password)}>
          비밀번호 변경
        </button>
      </div>
    </>
  );
};

export default Mypage;
