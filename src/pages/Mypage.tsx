import React, { useState } from "react";
import { useAuth } from "../features/mypage/hooks/useAuth";
import { usePasswordCheck } from "../features/signup/hooks/usePasswordCheck";
import { useNicknameValidation } from "../features/signup/hooks/useNicknameValidation";

type InfoType = {
  authPassword: string;
  nickname: string;
  password: string;
  rePassword: string;
};

const Mypage = () => {
  const [auth, setAuth] = useState(false);
  const [info, setInfo] = useState<InfoType>({
    authPassword: "",
    nickname: "",
    password: "",
    rePassword: "",
  });
  const { authorization } = useAuth(setAuth);
  const { checkNickname, nicknameValidation } = useNicknameValidation();
  const { validPassword, checkPasswordHandler } = usePasswordCheck(
    info.password
  );

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };
  const authPasswordHandler = () => {
    authorization.mutate(info.authPassword);
  };
  return (
    <>
      {auth ? (
        <div>
          <label>
            닉네임
            <input
              type="text"
              value={info.nickname}
              onChange={changeInputHandler}
            />
          </label>
          <button
            onClick={() => {
              checkNickname.mutate(info.nickname);
            }}
          >
            닉네임 중복확인
          </button>
          <button>닉네임 변경</button>
          <label>
            변경 비밀번호
            <input
              name="password"
              type="password"
              value={info.password}
              onChange={changeInputHandler}
            />
          </label>
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
              <span>
                비밀번호는 소문자, 숫자를 포함하는 8~15자리이어야합니다.
              </span>
            )
          ) : null}
          <button>비밀번호 변경</button>
        </div>
      ) : (
        <div>
          <label>
            비밀번호
            <input
              type="text"
              name="authPassword"
              value={info.authPassword}
              onChange={changeInputHandler}
            />
          </label>
          <button onClick={authPasswordHandler}>확인</button>
        </div>
      )}
    </>
  );
};

export default Mypage;
