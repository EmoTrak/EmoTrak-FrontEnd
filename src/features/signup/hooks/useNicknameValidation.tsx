import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const useNicknameValidation = () => {
  const [nicknameValidation, setNicknameValidation] = useState<boolean>(false);
  const validNickname = (item: string): boolean =>
    /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{1,8}$/.test(item);

  const checkNickname = useMutation(
    async (item: string) => {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/nick-check`,
        { nickname: item }
      );
      return data;
    },
    {
      onSuccess() {
        alert("사용가능한 닉네임입니다.");
        setNicknameValidation(true);
      },
      onError() {
        alert("중복된 닉네임입니다. 다른 닉네임을 입력해주세요.");
        setNicknameValidation(false);
      },
    }
  );

  return {
    validNickname,
    checkNickname,
    nicknameValidation,
    setNicknameValidation,
  };
};
