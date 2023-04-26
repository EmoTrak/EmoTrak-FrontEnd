import React, { useEffect, useState } from "react";
import { useAuth } from "../features/mypage/hooks/useAuth";
import { usePasswordCheck } from "../features/signup/hooks/usePasswordCheck";
import { useNicknameValidation } from "../features/signup/hooks/useNicknameValidation";
import { useChangePassword } from "../features/mypage/hooks/useChangePassword";
import { useChangeNickname } from "../features/mypage/hooks/useChangeNickname";
import { useWithdrawal } from "../features/mypage/hooks/useWithdrawal";
import InputList from "../features/mypage/components/InputList";
import { getCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { InfoType } from "../data/type/type";
import * as St from "../features/mypage/styles/MypageStyle";

const Mypage = () => {
  const navigate = useNavigate();
  const token = getCookie("token");
  const refreshToken = getCookie("refreshToken");
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
    if (name === "nickname") {
      setInfo({ ...info, [name]: value });
      setNicknameValidation(false);
    }
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

    if (!token && !refreshToken) {
      alert("로그인이 필요합니다!");
      navigate("/");
    }
  }, [userInfo]);

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <St.MyPageWrapper>
      <St.MyPageContentWrapper>
        <InputList name="이메일">
          <label>
            <St.MyPageInput
              type="text"
              name="email"
              value={info.email}
              disabled
            />
          </label>
        </InputList>
        <InputList name="닉네임">
          <St.MyPageInput
            type="text"
            name="nickname"
            value={info.nickname}
            onChange={changeInputHandler}
          />
          <St.MyPageButtonBox>
            {nicknameValidation ? (
              <Button
                size="small"
                disabled={!nicknameValidation}
                onClick={() => changeNickname.mutate(info.nickname)}
              >
                닉네임 변경
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() => checkNicknameHandler(info.nickname)}
              >
                중복확인
              </Button>
            )}
          </St.MyPageButtonBox>
        </InputList>
        <InputList name="비밀번호">
          <label>변경 비밀번호 </label>
          <St.MyPageInput
            name="password"
            type="password"
            value={info.password}
            onChange={changeInputHandler}
            disabled={userInfo?.hasSocial}
          />
          <div>
            {validPassword(info.password) ? null : (
              <St.MyPageHelperText important>
                비밀번호는 소문자, 숫자를 포함하는 8~15자리이어야합니다.
              </St.MyPageHelperText>
            )}
          </div>
          <label>변경 비밀번호 확인 </label>
          <St.MyPageInput
            name="rePassword"
            type="password"
            value={info.rePassword}
            onChange={changeInputHandler}
            disabled={userInfo?.hasSocial}
          />
          <div>
            {info.password ? (
              checkPasswordHandler(info.rePassword) ? (
                <St.MyPageHelperText>
                  비밀번호가 일치합니다.
                </St.MyPageHelperText>
              ) : (
                <St.MyPageHelperText important>
                  비밀번호가 일치하지 않습니다.
                </St.MyPageHelperText>
              )
            ) : (
              <St.MyPageHelperText>
                비밀번호를 다시 입력해주세요.
              </St.MyPageHelperText>
            )}
          </div>
          <St.MyPageButtonBox>
            <Button
              size="small"
              disabled={
                info.password === "" ||
                validPassword(info.password) === false ||
                checkPasswordHandler(info.rePassword) === false
              }
              onClick={() => changePassword.mutate(info.password)}
            >
              비밀번호 변경
            </Button>
          </St.MyPageButtonBox>
        </InputList>
        <St.MyPageButtonBox>
          <Button size="small" onClick={withdrawUserHandler}>
            회원탈퇴
          </Button>
        </St.MyPageButtonBox>
      </St.MyPageContentWrapper>
    </St.MyPageWrapper>
  );
};

export default Mypage;
