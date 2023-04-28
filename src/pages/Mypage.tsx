import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoType } from "../data/type/type";
import { themeColor } from "../utils/theme";
import { removeCookie } from "../utils/cookies";
import { useAuth } from "../features/mypage/hooks/useAuth";
import { usePasswordCheck } from "../features/signup/hooks/usePasswordCheck";
import { useNicknameValidation } from "../features/signup/hooks/useNicknameValidation";
import { useChangePassword } from "../features/mypage/hooks/useChangePassword";
import { useChangeNickname } from "../features/mypage/hooks/useChangeNickname";
import { useWithdrawal } from "../features/mypage/hooks/useWithdrawal";
import Button from "../components/Button";
import InputList from "../features/mypage/components/InputList";
import * as St from "../features/mypage/styles/MypageStyle";

const Mypage = () => {
  const { isLoading, userInfo } = useAuth();
  const { withdraw } = useWithdrawal();
  const navigate = useNavigate();

  const [info, setInfo] = useState<InfoType>({
    email: userInfo?.email,
    nickname: userInfo?.nickname,
    password: "",
    rePassword: "",
  });

  const [regExpPassword, setRegExpPassword] = useState(false);

  const { checkNickname, validNickname, setNicknameValidation, nicknameValidation } =
    useNicknameValidation();
  const { validPassword, checkPasswordHandler, doublePassword } = usePasswordCheck(
    info.password
  );

  const { changePassword } = useChangePassword();
  const { changeNickname } = useChangeNickname();

  const checkNicknameHandler = (nickname: string) => {
    if (validNickname(nickname)) {
      checkNickname.mutate(nickname);
    } else {
      setNicknameValidation(false);
    }
  };

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
    if (name === "nickname") {
      setNicknameValidation(false);
    }
    if (name === "password") {
      setRegExpPassword(validPassword(info.password));
    }
    if (name === "rePassword") {
      checkPasswordHandler(event.target.value);
    }
  };

  const withdrawUserHandler = () => {
    window.confirm("정말 탈퇴하시겠습니까?") && withdraw.mutate();
  };

  const logoutUserHandler = () => {
    if (window.confirm("로그아웃하시겠습니까")) {
      removeCookie("token", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
      removeCookie("expire", { path: "/" });
      navigate("/");
    }
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
    return <>로딩중..</>;
  }

  return (
    <St.MyPageWrapper>
      <St.MyPageContentWrapper>
        <St.MobileLogoutButton onClick={logoutUserHandler}>
          로그아웃
        </St.MobileLogoutButton>
        <InputList name="이메일">
          <St.MyPageInput type="text" name="email" value={info.email} disabled />
        </InputList>
        <InputList name="닉네임">
          <St.MyPageInput
            type="text"
            name="nickname"
            maxLength={8}
            value={info.nickname}
            onChange={changeInputHandler}
          />
          <>
            {nicknameValidation ? (
              <St.MyPageHelperText>닉네임을 변경하시겠습니까?</St.MyPageHelperText>
            ) : (
              <St.MyPageHelperText important>
                닉네임은 8글자 이하여야합니다.
              </St.MyPageHelperText>
            )}
          </>
          <St.MyPageButtonBox>
            {nicknameValidation ? (
              <Button
                size="small"
                disabled={!nicknameValidation}
                onClick={() => changeNickname.mutate(info.nickname)}
                style={{
                  backgroundColor: themeColor.main.red,
                  color: themeColor.main.white,
                }}
              >
                닉네임 변경
              </Button>
            ) : (
              <Button size="small" onClick={() => checkNicknameHandler(info.nickname)}>
                중복확인
              </Button>
            )}
          </St.MyPageButtonBox>
        </InputList>
        <InputList name="비밀번호">
          <St.MyPageLabel>
            <St.MyPageInput
              name="password"
              type="password"
              maxLength={15}
              value={info.password}
              onChange={changeInputHandler}
              disabled={userInfo?.hasSocial}
              placeholder="변경 비밀번호"
            />
          </St.MyPageLabel>
          {!regExpPassword && (
            <St.MyPageHelperText important>
              비밀번호는 소문자, 숫자를 포함하는 8~15자리이어야합니다.
            </St.MyPageHelperText>
          )}
          <St.MyPageLabel>
            <St.MyPageInput
              name="rePassword"
              type="password"
              maxLength={15}
              value={info.rePassword}
              onChange={changeInputHandler}
              disabled={userInfo?.hasSocial}
              placeholder="변경 비밀번호 확인"
            />
          </St.MyPageLabel>
          <>
            {!info.password ? (
              <St.MyPageHelperText>비밀번호를 다시 입력해주세요.</St.MyPageHelperText>
            ) : doublePassword ? (
              <St.MyPageHelperText>비밀번호가 일치합니다.</St.MyPageHelperText>
            ) : (
              <St.MyPageHelperText important>
                비밀번호가 일치하지 않습니다.
              </St.MyPageHelperText>
            )}
          </>
          <St.MyPageButtonBox>
            <Button
              size="small"
              disabled={info.password === "" || !regExpPassword}
              onClick={() => changePassword.mutate(info.password)}
            >
              비밀번호 변경
            </Button>
          </St.MyPageButtonBox>
        </InputList>
        <St.MyPageButtonBox>
          <Button
            size="small"
            onClick={withdrawUserHandler}
            style={{
              backgroundColor: themeColor.main.red,
              color: themeColor.main.white,
            }}
          >
            회원탈퇴
          </Button>
        </St.MyPageButtonBox>
      </St.MyPageContentWrapper>
    </St.MyPageWrapper>
  );
};

export default Mypage;
